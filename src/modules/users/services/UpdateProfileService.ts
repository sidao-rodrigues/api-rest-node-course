import { compare, hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already one user with this email');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
