import { NotFoundException } from '@nestjs/common';

class PostNotFoundException extends NotFoundException {
  constructor(postId: number | string) {
    super(`Post with id ${postId} not found`);
  }
}

export default PostNotFoundException;
