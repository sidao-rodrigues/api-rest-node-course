import { v4 as uuidv4 } from 'uuid';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICreateUser } from '../../models/ICreateUser';
import User from '@modules/users/infra/typeorm/entities/User';
import { IPaginateUser } from '../../models/IPaginateUser';
import { IUsersRepository } from '../IUsersRepository';

type IAttributesFind = 'email' | 'name' | 'id';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(customer: Customer): Promise<void> {
    //
  }

  public async findAll(): Promise<IPaginateUser> {
    return {
      perPage: 1,
      total: this.users.length,
      currentPage: 1,
      data: this.users,
    };
  }

  public async findByName(name: string): Promise<User | undefined> {
    return this.findByAttribute(name, 'name');
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.findByAttribute(id, 'id');
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.findByAttribute(email, 'email');
  }

  private findByAttribute(value: string, attribute: IAttributesFind) {
    const user = this.users.find(user => user[attribute] === value);
    return user;
  }
}

export default FakeUsersRepository;
