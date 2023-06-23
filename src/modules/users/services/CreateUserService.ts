import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
