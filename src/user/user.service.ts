import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private model: typeof User
  ){}
  async create(createUserDto: CreateUserDto) {
    const user = await this.model.create({...createUserDto})
    return user;
  }

  async findAll() {
    return await this.model.findAll()
  }

  async findOne(id: number) {
    const user = await this.model.findByPk(id)
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.model.update( updateUserDto, {where: {id}, returning: true})
    return user[1][0]
  }

  async remove(id: number) {
    await this.model.destroy({where: {id}})
    return {data: {}};
  }
}
