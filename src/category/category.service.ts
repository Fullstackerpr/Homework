import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.repo.create(createCategoryDto);
    return this.repo.save(category);
  }

  async findAll() {
    const categories = await this.repo.find({ relations: ['products'] });
    return {categories};
  }

  async findOne({ id }: { id: number }) {
    const category = await this.repo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException('not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.repo.update({ id }, updateCategoryDto);
    const category = await this.repo.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('not found');
    }
    return category;
  }

  async remove({ id }: { id: number }) {
    const category = await this.repo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException('not found');
    }
    await this.repo.delete({ id });
    return {};
  }
}
