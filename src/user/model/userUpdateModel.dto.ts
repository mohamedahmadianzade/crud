import { IsEmail,IsOptional , IsString} from 'class-validator';

export class UserUpdateModel {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  fullName: string;
}
