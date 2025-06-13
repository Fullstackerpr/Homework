import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.shema';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private model: Model<Group>) {}
  
    async create(createUserDto: CreateGroupDto) {
      try {
        const group = await this.model.create(createUserDto)
        return group
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    async getAll(){
      try {
        const groups = await this.model.find();
        return groups;
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    async getById(id: string) {
      try {
        const group = await this.model.findById(id);
        if(!group) {
          throw new NotFoundError('user not found')
        }
        return group
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    } 
  
    async update(id: string, updateUserDto: UpdateGroupDto) {
      try {
        const group = await this.model.findByIdAndUpdate(id, updateUserDto, {new: true});
        return group
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
