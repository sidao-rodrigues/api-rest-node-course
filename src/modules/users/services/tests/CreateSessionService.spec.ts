import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateSessionsService from '../CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Sidney Rodrigues',
      email: 'teste@teste.com.br',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'teste@teste.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'teste@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Sidney Rodrigues',
      email: 'teste@teste.com.br',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'teste@teste.com.br',
        password: '123@456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
