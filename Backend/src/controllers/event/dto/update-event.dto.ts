import { UpdateEventDto } from 'src/core/services/event/dtos';
import { IsInt, IsNumber, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateEventReqApiDto implements UpdateEventDto {
  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  name?: string;

  @IsOptional()
  @MaxLength(4096)
  description?: string;

  @IsOptional()
  @IsInt()
  ticket_count?: number;

  @IsOptional()
  @IsInt()
  ticket_price?: number;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  date?: Date;
}