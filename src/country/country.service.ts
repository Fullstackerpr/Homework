import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './model/country.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country) private model: typeof Country
    ){}
  

  async create(createCountryDto: CreateCountryDto) {
    const newCountry = this.model.create({...createCountryDto});
    return newCountry
  }

  async findAll() {
    const countries = await this.model.findAll({include: {model: User}});
    return {
      statusCode: 200,
      message: 'success',
      data: countries,
    };
  }

  async findOne(id: number) {
    const country = await this.model.findByPk(id,  {include: {model: User}});
    if (!country) {
      throw new NotFoundException(`Country not found by id: ${id}`);
    }
    return {
      statusCode: 200,
      message: 'success',
      data: country,
    };
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.model.update(updateCountryDto, {where:{id}, returning: true});
    if (!country) {
      throw new NotFoundException(`Country not found by id: ${id}`);
    }

    return {
      statusCode: 200,
      message: 'success',
      data: country,
    };
  }

  async remove(id: number) {
    const country = await this.model.destroy({ where: { id } });
    if (!country) {
      throw new NotFoundException(`Country not found by id: ${id}`);
    }

    return {
      statusCode: 200,
      message: 'deleted successfully',
      data: {},
    };
  }
}
