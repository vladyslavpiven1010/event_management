import { UpdateCategoryDto } from 'src/core/services/category/dtos';
import { MaxLength, MinLength, IsOptional } from 'class-validator';

export class UpdateCategoryReqApiDto implements UpdateCategoryDto {
  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(8192)
  description: string;
}