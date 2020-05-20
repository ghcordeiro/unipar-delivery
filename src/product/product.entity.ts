import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from 'src/orderItem/orderItem.entity';

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'code', type: 'varchar' })
  code: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'price', type: 'numeric', precision: 15, scale: 2 })
  price: number;

  @Column({ name: 'stock_quantity', type: 'numeric', precision: 15, scale: 3 })
  stockQuantity: number;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => OrderItem, orderItem => orderItem.product)
  orderItem: OrderItem;
}
