import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundError } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private model: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.model.create(createUserDto)
      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getAll(){
    try {
      const users = await this.model.find();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getById(id: string) {
    try {
      const user = await this.model.findById(id);
      if(!user) {
        throw new NotFoundError('user not found')
      }
      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  } 

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.model.findByIdAndUpdate(id, updateUserDto, {new: true});
      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async delete(id: string) {
    try {
      await this.model.findByIdAndDelete(id)
      return {}
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
