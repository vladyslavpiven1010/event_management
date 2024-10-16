import { IsInt, IsOptional, IsDate, IsString } from 'class-validator';
import { UpdateUserDto } from 'src/core/services/user/dto';

export class UpdateUserReqApiDto implements UpdateUserDto {
  @IsOptional()
  @IsInt()
  role_id: number;

  @IsOptional()
  @IsInt()
  company_id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
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