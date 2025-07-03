import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userRepo.findOne({
      where: { id: createPostDto.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const post = this.repo.create({ title: createPostDto.title, user });
    return this.repo.save(post);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.repo.update({ id }, updatePostDto);
    const post = await this.repo.findOne({ where: { id } });
    return post;
  }

  async remove(id: number) {
    await this.repo.delete({ id });
    return {};
  }
}
