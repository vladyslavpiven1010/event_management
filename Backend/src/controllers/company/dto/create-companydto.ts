import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { CreateCompanyDto } from 'src/core/services/company/dto';

export class CreateCompanyReqApiDto implements CreateCompanyDto {
  @IsInt()
  user_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  country_code: string;

  @IsBoolean()
  is_verified: boolean;

  @IsDate()
  created_at: Date;

  @IsDate()
  deleted_at: Date;
}