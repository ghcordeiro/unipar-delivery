import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Customer } from '../customer/customer.entity';
import { OrderItem } from "../orderItem/orderItem.entity";

@Entity("order")
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_number', type: 'integer' })
  orderNumber: number;

  @Column({ name: 'order_date', type: 'timestamp with time zone' })
  orderDate: Date;

  @Column({ name: 'total', type: 'numeric', precision: 15, scale: 2 })
  total: number;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(type => Customer, customer => customer.order, { cascade: true, eager: true, onDelete: 'SET NULL' })
  customer: Customer;

  @OneToMany(type => OrderItem, orderItem => orderItem.order, { cascade: true, eager: true, onDelete: 'CASCADE' })
  orderItems: OrderItem[];

}
