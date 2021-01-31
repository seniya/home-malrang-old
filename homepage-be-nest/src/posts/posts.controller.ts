import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt.auth.guard';
import RequestWithUserIf from '../authentication/interface/requestWithUser.interface';
import FindOneParams from '../utils/findOneParams';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { PostsService } from './posts.service';
import { ResponseJson } from '../utils/responseJson';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<ResponseJson> {
    try {
      const item = await this.postsService.getAllPosts();
      return new ResponseJson().success(item);
    } catch (error) {
      return new ResponseJson().error(error.status, error.message);
    }
  }

  @Get(':id')
  async getPostById(@Param() { id }: FindOneParams) {
    try {
      const item = await this.postsService.getPostById(Number(id));
      return new ResponseJson().success(item);
    } catch (error) {
      return new ResponseJson().error(error.status, error.message);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUserIf) {
    try {
      const item = await this.postsService.createPost(post, req.user);
      return new ResponseJson().success(item);
    } catch (error) {
      return new ResponseJson().error(error.status, error.message);
    }
  }

  @Post('/update/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto) {
    try {
      const item = await this.postsService.updatePost(Number(id), post);
      return new ResponseJson().success(item);
    } catch (error) {
      return new ResponseJson().error(error.status, error.message);
    }
  }

  @Post('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param() { id }: FindOneParams) {
    try {
      const item = await this.postsService.deletePost(Number(id));
      return new ResponseJson().success(item);
    } catch (error) {
      return new ResponseJson().error(error.status, error.message);
    }
  }
}
