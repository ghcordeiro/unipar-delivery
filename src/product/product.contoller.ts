import { Controller, Post, Body, Get, Param, Delete, Put, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Response } from 'express';

interface ProductDTO {
  name?: string;
  price?: number;
  stockQuantity?: number;
}

@Controller('product')
export class ProductController {

  constructor(private readonly service: ProductService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findById(@Param() id: string) {
    return this.service.findById(id);
  }

  @Post()
  save(@Body() product: Product) {
    return this.service.save(product);
  }

  @Put(":id")
  async update(@Param() id: string, @Body() { name, price, stockQuantity }: ProductDTO) {
    const product = await this.findById(id);
    name ? delete product.name : null;
    price ? delete product.price : null;
    stockQuantity ? delete product.stockQuantity : null;

    let productUpdated = Object.assign(product, { name, price, stockQuantity });

    return this.service.save(productUpdated);
  }

  @Delete(":id")
  async remove(@Param() id: string, @Res() res: Response) {
    await this.service.delete(id);
    return res.status(200).json({ message: "The product was successfully deleted!" });
  }

}
