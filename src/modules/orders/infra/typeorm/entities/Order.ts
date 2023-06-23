import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import OrdersProducts from './OrdersProducts';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IOrder } from '@modules/orders/domain/models/IOrder';

@Entity('orders')
class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, orderProducts => orderProducts.order, {
    cascade: true,
  })
  orderProducts: OrdersProducts[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Order;
