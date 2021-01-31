import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export enum EUploadType {
  file = 'file',
  image = 'image',
}

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsNumber()
  cntDown: number;

  @IsBoolean()
  readAll: boolean;

  @IsBoolean()
  useAble: boolean;

  @IsString()
  @IsNotEmpty()
  uploadType: EUploadType;
}

export default CreateFileDto;
