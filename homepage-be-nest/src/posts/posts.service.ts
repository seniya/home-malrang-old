import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/user.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import PostNotFoundException from './exceptions/postNotFound.exception';
import Post from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find({
      relations: ['author', 'categories', 'attachment'],
      order: {
        id: 'DESC',
      },
    });
    // ({ relations: ['author'], desc: 'id' });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id, { relations: ['author', 'categories', 'attachment'] });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    user.password = undefined;
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.save(post);
    const updatedPost = await this.postsRepository.findOne(id, { relations: ['author', 'categories', 'attachment'] });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
