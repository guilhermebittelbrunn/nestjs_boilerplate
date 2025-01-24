import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  marketplaceId: string;
}
