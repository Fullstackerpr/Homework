import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'Create')
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @GrpcMethod('CategoryService', 'FindAll')
  findAll() {
    return this.categoryService.findAll();
  }

  @GrpcMethod('CategoryService', 'FindOne')
  findOne(@Payload() data: { id: number }) {
    return this.categoryService.findOne(data);
  }

  @GrpcMethod('CategoryService', 'Update')
  update(@Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto.id, updateCategoryDto);
  }

  @GrpcMethod('CategoryService', 'Remove')
  remove(@Payload() data: {id: number}) {
    return this.categoryService.remove(data);
  }
}