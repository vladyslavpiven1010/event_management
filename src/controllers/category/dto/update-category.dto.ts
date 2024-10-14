import { UpdateCategoryDto } from 'src/core/services/category/dtos';
import { MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryReqApiDto implements UpdateCategoryDto {
  @MinLength(1)
  @MaxLength(256)
  name: string;
}