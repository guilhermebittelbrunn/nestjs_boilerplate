import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSellerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
