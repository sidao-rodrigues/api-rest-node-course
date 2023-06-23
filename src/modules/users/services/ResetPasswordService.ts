import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { IResetPassword } from '../domain/models/IResetPassword';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expried');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
