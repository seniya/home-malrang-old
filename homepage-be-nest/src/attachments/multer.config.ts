import * as path from 'path';
import * as moment from 'moment';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

const multerConfig = () => {
  return {
    dest: process.env.UPLOAD_LOCATION,
    fileSize: Number(process.env.FILE_SIZE),
    imageSize: Number(process.env.IMAGE_SIZE),
  };
};

function destFolder() {
  return path.join(__dirname, '../../' + multerConfig().dest, moment().format('YYYY_MM'));
}

export const multerImageOptions = {
  limits: {
    fileSize: multerConfig().imageSize,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(new HttpException(`Unsupported file type ${path.extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = destFolder();
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${path.extname(file.originalname)}`);
    },
  }),
};

export const multerFileOptions = {
  limits: {
    fileSize: multerConfig().fileSize,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    cb(null, true);
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = destFolder();
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${path.extname(file.originalname)}`);
    },
  }),
};
