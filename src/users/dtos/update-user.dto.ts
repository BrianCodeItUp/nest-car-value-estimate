import { IsEmail, IsString, IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
