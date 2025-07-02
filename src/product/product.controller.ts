import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'Create')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @GrpcMethod('ProductService', 'FindAll')
  findAll() {
    return this.productService.findAll();
  }

  @GrpcMethod('ProductService', 'FindOne')
  findOne(@Payload() data: {id: number}) {
    return this.productService.findOne(data);
  }

  @GrpcMethod('ProductService', 'Update')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @GrpcMethod('ProductService', 'Remove')
  remove(@Payload() data: {id: number}) {
    return this.productService.remove(data);
  }
}
