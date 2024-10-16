import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/core/services/user/dto';

export class CreateUserReqApiDto implements CreateUserDto {
  @IsInt()
  role_id: number;

  @IsOptional()
  @IsInt()
  company_id: number;

  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsDate()
  birth_date: Date;

  @IsOptional()
  @IsString()
  gender: string;
}