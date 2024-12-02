import { IsInt, IsOptional, IsDate, IsString } from 'class-validator';
import { UpdateUserDto } from 'src/core/services/user/dto';

export class UpdateUserReqApiDto implements UpdateUserDto {
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
  bio: string;

  @IsOptional()
  @IsDate()
  birth_date: Date;

  @IsOptional()
  @IsString()
  gender: string;
}