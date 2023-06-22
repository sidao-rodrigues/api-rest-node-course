import { ICustomerPaginate } from './../../../domain/models/ICustomerPaginate';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

interface ISearchParams {
  page: number;
  skip: number;
  take: number;
}

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: ISearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();
    const results = {
      perPage: take,
      total: count,
      currentPage: page,
      data: customers,
    };
    return results;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return customer;
  }
}

export default CustomersRepository;
