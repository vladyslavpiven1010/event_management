import { UpdateEventDto } from 'src/core/services/event/dtos';
import { IsInt, IsOptional, MaxLength, MinLength, IsISO8601 } from 'class-validator';

export class UpdateEventReqApiDto implements UpdateEventDto {
  @IsOptional()
  @IsInt()
  company_id: number;

  @IsOptional()
  @IsInt()
  category_id: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @IsOptional()
  @MaxLength(4096)
  description?: string;

  @IsOptional()
  @IsInt()
  format?: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  image_url?: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  wrapper_url?: string;

  @IsOptional()
  @IsInt()
  ticket_count: number;

  @IsOptional()
  @IsInt()
  ticket_price: number;

  @IsOptional()
  @IsISO8601()
  created_at?: Date;

  @IsOptional()
  @IsISO8601()
  deleted_at?: Date;

  @IsOptional()
  @IsISO8601()
  date?: Date;
}