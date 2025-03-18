import { IsEmail, IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
