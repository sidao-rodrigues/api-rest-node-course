import { v4 as uuidv4 } from 'uuid';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';

type IAttributesFind = 'email' | 'name' | 'id';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);
    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    // const index = this.customers.findIndex(c => c.id === customer.id);
    // if(index) {
    //   this.customers.remove(idx);
    // }
  }

  public async findAll(): Promise<ICustomerPaginate> {
    return {
      perPage: 1,
      total: this.customers.length,
      currentPage: 1,
      data: this.customers,
    };
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return this.findByAttribute(name, 'name');
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.findByAttribute(id, 'id');
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.findByAttribute(email, 'email');
  }

  private findByAttribute(value: string, attribute: IAttributesFind) {
    const customer = this.customers.find(
      customer => customer[attribute] === value,
    );
    return customer;
  }
}

export default FakeCustomersRepository;
