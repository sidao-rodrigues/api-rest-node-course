import { DataSource } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { CreateProducts1685643559992 } from './migrations/1685643559992-CreateProducts';
import { CreateUsers1686417696424 } from './migrations/1686417696424-CreateUsers';
import { CreateUserTokens1687191820929 } from './migrations/1687191820929-CreateUserTokens';
import { CreateCustomers1687343565259 } from './migrations/1687343565259-CreateCustomers';
import { CreateOrders1687347365540 } from './migrations/1687347365540-CreateOrders';
import { AddCustomerIdToOrders1687347513274 } from './migrations/1687347513274-AddCustomerIdToOrders';
import { CreateOrdersProducts1687348114462 } from './migrations/1687348114462-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1687348290480 } from './migrations/1687348290480-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1687348467082 } from './migrations/1687348467082-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1685643559992,
    CreateUsers1686417696424,
    CreateUserTokens1687191820929,
    CreateCustomers1687343565259,
    CreateOrders1687347365540,
    AddCustomerIdToOrders1687347513274,
    CreateOrdersProducts1687348114462,
    AddOrderIdToOrdersProducts1687348290480,
    AddProductIdToOrdersProducts1687348467082,
  ],
});
