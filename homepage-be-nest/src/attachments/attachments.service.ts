import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FileNotFoundException from './exceptions/fileNotFound.exception';
import User from 'src/users/user.entity';
import { Repository } from 'typeorm';
import Attachment from './attachment.entity';
import CreateFileDto, { EUploadType } from './dto/createFile.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private filesRepository: Repository<Attachment>,
    private configService: ConfigService,
  ) {}

  async createFile(file: Express.Multer.File, user: User, uploadType: EUploadType) {
    const fileItem: CreateFileDto = {
      ...file,
      cntDown: 0,
      readAll: true,
      useAble: true,
      uploadType,
    };
    user.password = undefined;
    //console.log('createFile fileItem : ', fileItem);

    const newFile = await this.filesRepository.create({
      ...fileItem,
      author: user,
    });
    await this.filesRepository.save(newFile);

    const urlMiddle = uploadType === EUploadType.file ? '/attachments/file/' : '/attachments/image/';
    const download = this.configService.get('API_URL') + urlMiddle + newFile.id;
    const resFile = {
      ...newFile,
      download,
    };

    return resFile;
  }

  async getFileById(id: string) {
    const file = await this.filesRepository.findOne(id, { relations: ['author'] });
    if (file) {
      // const { path: fpath } = file;
      // const stream = fs.createReadStream(fpath);
      // console.log('getFileById stream : ', stream);
      return file;
    }
    throw new FileNotFoundException(id);
  }
}
