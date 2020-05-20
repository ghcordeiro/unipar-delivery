import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Order } from "src/order/order.entity";

@Entity("customer")
export class Customer {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: '80' })
  name: string;

  @Column({ name: 'cpf', type: 'varchar', length: '20' })
  cpf: string;

  @Column({ name: 'address', type: 'varchar', length: '80' })
  address: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => Order, order => order.customer)
  order: Order;
}
