import { container } from 'tsyringe';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokenRepository,
);
