import { Controller, Post, Body, Get, Param, Delete, Put, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';
import { Response } from 'express';

interface OrderItemDTO {
  product?: Product;
  quantity?: number;
  unitValue?: number;
  totalValue?: number;
}

interface OrderDTO {
  orderNumber?: number;
  orderDate?: Date;
  total?: number;
  orderItem?: OrderItemDTO;
}

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {
  }

  @Post()
  async save(@Body() order: Order) {
    return this.service.save(order);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findById(@Param() id: string) {
    return this.service.findById(id);
  }

  @Put(":id")
  async update(@Param() id: string, @Body() dto: OrderDTO) {
    const order = await this.findById(id);

    dto.orderDate ? delete dto.orderDate : null;
    dto.orderNumber ? delete dto.orderNumber : null;
    dto.total ? delete dto.total : null;
    dto.orderItem.product ? delete dto.orderItem.product : null;
    dto.orderItem.quantity ? delete dto.orderItem.quantity : null;
    dto.orderItem.totalValue ? delete dto.orderItem.totalValue : null;
    dto.orderItem.unitValue ? delete dto.orderItem.unitValue : null;

    let orderUpdated = Object.assign(order, dto);

    return this.service.save(orderUpdated);
  }

  @Delete(":id")
  remove(@Param() id: string, @Res() res: Response) {
    this.service.delete(id);
    return res.status(200).json({ message: "The order was successfully deleted!" });
  }

}
