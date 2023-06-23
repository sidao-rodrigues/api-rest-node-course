import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from '../CreateCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustumer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustumer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustumer.execute({
      name: 'Sidney Rodrigues',
      email: 'teste@teste.com.br',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustumer.execute({
      name: 'Sidney Rodrigues',
      email: 'teste@teste.com.br',
    });

    expect(
      createCustumer.execute({
        name: 'Sidney Rodrigues',
        email: 'teste@teste.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
