import { IsOptional, IsDate, IsString, IsBoolean } from 'class-validator';
import { UpdateCompanyDto } from 'src/core/services/company/dto';

export class UpdateCompanyReqApiDto implements UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  country_code: string;

  @IsOptional()
  @IsBoolean()
  is_verified: boolean;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  deleted_at: Date;
}