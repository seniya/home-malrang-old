import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import * as fs from 'fs';
import { multerFileOptions, multerImageOptions } from './multer.config';
import RequestWithUserIf from 'src/authentication/interface/requestWithUser.interface';
import { ResponseJson } from 'src/utils/responseJson';
import { getIconvFilename } from '../utils/safeHangul';
import { AttachmentsService } from './attachments.service';
import FileNotFoundException from './exceptions/fileNotFound.exception';
import { EUploadType } from './dto/createFile.dto';

@Controller('api/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post('file')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerFileOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: RequestWithUserIf) {
    try {
      const item = await this.attachmentsService.createFile(file, req.user, EUploadType.file);
      return new ResponseJson().success(item);
    } catch (error) {
      return new ResponseJson().error(error.status, error.message);
    }
  }

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerImageOptions))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: RequestWithUserIf) {
    try {
      const item = await this.attachmentsService.createFile(file, req.user, EUploadType.image);
      return new ResponseJson().success(item);
    } catch (error) {
      return new ResponseJson().error(error.status, error.message);
    }
  }

  @Get('file/:id')
  async getFile(@Param() id: string, @Req() req, @Res() res: Response) {
    try {
      const file = await this.attachmentsService.getFileById(id);
      const { mimetype, size, originalname, path: fpath } = file;
      const filename = getIconvFilename(req, originalname);
      res.set({
        'Content-disposition': 'attachment; filename=' + filename,
        'Content-Type': mimetype,
        'Content-Length': size,
      });
      const stream = fs.createReadStream(fpath);
      stream.pipe(res);
    } catch (error) {
      throw new FileNotFoundException(id);
    }
  }

  @Get('image/:id')
  async getImage(@Param() id: string, @Req() req, @Res() res: Response) {
    try {
      const file = await this.attachmentsService.getFileById(id);
      const { mimetype, size, originalname, path: fpath } = file;
      const filename = getIconvFilename(req, originalname);
      res.set({
        'Content-disposition': 'inline; filename=' + filename,
        'Content-Type': mimetype,
        'Content-Length': size,
      });
      const stream = fs.createReadStream(fpath);
      stream.pipe(res);
    } catch (error) {
      throw new FileNotFoundException(id);
    }
  }
}
