import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from '../CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustumer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustumer.execute({
      name: 'Sidney Rodrigues',
      email: 'teste@teste.com.br',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create twot customers with eh same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustumer = new CreateCustomerService(fakeCustomersRepository);

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
