import { dataSource } from '@shared/infra/typeorm/index';
import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

class UserTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOneBy({
      token,
    });
    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userId,
    });
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
