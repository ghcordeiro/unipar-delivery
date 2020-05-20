import { Controller, Post, Body, Get, Param, Delete, Put, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { Response } from 'express';

interface CustomerDTO {
  name: string;
  address: string;
}

@Controller('customer')
export class CustomerController {

  constructor(private readonly service: CustomerService) { }

  @Post()
  save(@Body() customer: Customer) {
    return this.service.save(customer);
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
  async update(@Param() id: string, @Body() { name, address }: CustomerDTO) {
    const customer = await this.findById(id);
    name ? delete customer.name : null;
    address ? delete customer.address : null;

    let customerUpdated = Object.assign(customer, { name, address });

    return this.service.save(customerUpdated);
  }

  @Delete(":id")
  remove(@Param() id: string, @Res() res: Response) {
    this.service.delete(id);
    return res.status(200).json({ message: "The client was successfully deleted!" });
  }

}
