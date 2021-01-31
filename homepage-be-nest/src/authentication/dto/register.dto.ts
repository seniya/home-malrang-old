import { IsEmail, IsString, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  termsAgree: boolean;
}

export default RegisterDto;
