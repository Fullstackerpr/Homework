import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({
        data: createPostDto,
      });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async findAll() {
    try {
      const posts = await this.prisma.post.findMany({
        include: { user: true },
      });
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findFirst({ where: { id } });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const updatePost = await this.prisma.post.update({
        where: { id },
        data: { ...updatePostDto },
      });
      return updatePost;
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.post.delete({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      throw new InternalServerErrorException(error, error?.status);
    }
  }
}
