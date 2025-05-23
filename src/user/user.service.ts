import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from 'src/country/model/country.entity';

@Injectable()
export class UserService {
  constructor(
  @InjectModel(User) private model: typeof User
  ){}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.model.create({...CreateUserDto});
    return newUser
  }

  async findAll() {
    const users = await this.model.findAll({include: {model: Country}});
    return users
  }

  async findOne(id: number) {
    const user =await this.model.findByPk(id,{include: {model: Country}});
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.model.update(updateUserDto, {where:{id}, returning: true});
    return user
  }

  async remove(id: number) {
    await this.model.destroy({where: {id}});
    return {data: {}};
  }
}
