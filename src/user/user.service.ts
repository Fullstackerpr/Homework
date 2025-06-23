import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          username: createUserDto.username,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        include: { posts: true },
      });
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
      return updateUser;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { message: 'success' }
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }
}
