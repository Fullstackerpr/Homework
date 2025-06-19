import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existEmail = await this.userRepo.findOne({
        where: { email: createUserDto.email },
      });
      if(existEmail) {
        throw new ConflictException('Email already exists')
      }
      const user = this.userRepo.create(createUserDto);
      await this.userRepo.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.find({
        select: ['id', 'full_name', 'email'],
        order: { createdAt: 'DESC' },
        relations: ['posts']
      });
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        select: ['id', 'full_name', 'email'],
        relations: ['posts']
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      await this.userRepo.update({ id }, updateUserDto);
      const updateUser = await this.userRepo.findOne({
        where: { id },
        select: ['id', 'full_name', 'email'],
      });
      return updateUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      await this.userRepo.delete(id);
      return { message: 'success' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
