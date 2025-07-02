import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) { }
  
  async create(createProductDto: CreateProductDto) {
    
  }

  async findAll() {
    
  }

  async findOne({id}: {id: number}) {
    
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
  }

  async remove({id}: {id: number}) {
    
  }
}
