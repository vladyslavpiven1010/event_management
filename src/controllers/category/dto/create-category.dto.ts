import { CreateCategoryDto } from 'src/core/services/category/dtos';
import { MaxLength, MinLength } from 'class-validator';

export class CreateCategoryReqApiDto implements CreateCategoryDto {
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @MinLength(1)
  @MaxLength(8192)
  description: string;
}