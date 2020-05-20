import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './customer/customer.entity';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.contoller';

import { Product } from './product/product.entity';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.contoller';

import { Order } from './order/order.entity';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.contoller';

import { OrderItem } from './orderItem/orderItem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'unipar-delivery',
      entities: [
        Customer,
        Product,
        Order,
        OrderItem
      ],
      synchronize: true,
      logging: true
    }),
    TypeOrmModule.forFeature([
      Customer,
      Product,
      Order,
      OrderItem
    ])
  ],
  controllers: [
    CustomerController,
    ProductController,
    OrderController
  ],
  providers: [
    CustomerService,
    ProductService,
    OrderService
  ],
})
export class AppModule { }
