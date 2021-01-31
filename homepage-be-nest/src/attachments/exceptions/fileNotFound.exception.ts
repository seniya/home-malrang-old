import { NotFoundException } from '@nestjs/common';

class FileNotFound extends NotFoundException {
  constructor(fileId: number | string) {
    super(`File with id ${fileId} not found or Server Error`);
  }
}

export default FileNotFound;
