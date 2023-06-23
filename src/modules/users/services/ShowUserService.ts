import AppError from '@shared/errors/AppError';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

export default ShowUserService;
