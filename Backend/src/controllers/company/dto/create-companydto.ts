import { IsBoolean, IsDate, IsString } from 'class-validator';
import { CreateCompanyDto } from 'src/core/services/company/dto';

export class CreateCompanyReqApiDto implements CreateCompanyDto {
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