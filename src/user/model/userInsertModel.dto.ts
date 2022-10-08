import { IsEmail, IsNotEmpty, IsOptional,IsString } from 'class-validator';
export class UserInsertModel {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsString()
  fullName: string;
  @IsEmail()
  @IsOptional()
  email: string;
}
