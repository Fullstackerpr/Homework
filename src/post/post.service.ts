import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    private readonly userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const user = await this.userService.findOne(createPostDto.user_id);
      const post = this.postRepo.create({ ...createPostDto, user });
      await this.postRepo.save(post);
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const posts = await this.postRepo.find({
        select: ['id', 'title', 'body', 'user'],
        order: { createAt: 'DESC' },
        relations: ['user'],
      });
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.postRepo.findOne({
        where: { id },
        select: ['id', 'title', 'body', 'user'],
        relations: ['user'],
      });
      if (!post) {
        throw new NotFoundException('Post not found!');
      }
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postRepo.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!post) {
        throw new NotFoundException('Post not found!');
      }
      let user = await this.userService.findOne(post.user.id);
      if (updatePostDto.user_id) {
        user = await this.userService.findOne(updatePostDto.user_id);
        delete updatePostDto.user_id;
      }
      await this.postRepo.update({ id }, { ...updatePostDto, user });
      const updatePost = await this.postRepo.findOne({
        where: { id },
        select: ['id', 'title', 'body', 'user'],
        relations: ['user'],
      });
      return updatePost;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const post = await this.postRepo.findOne({
        where: { id }
      });
      if (!post) {
        throw new NotFoundException('Post not found!');
      }
      await this.postRepo.delete({id});
      return { message: 'success' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}