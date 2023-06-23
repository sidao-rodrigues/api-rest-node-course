import { IUserToken } from '../models/IUserToken';

export interface IUserTokensRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  generate(userId: string): Promise<IUserToken>;
}
