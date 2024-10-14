import { UpdateEventDto } from 'src/core/services/event/dtos';
import { IsInt, IsOptional, MaxLength, MinLength, IsDate } from 'class-validator';

export class UpdateEventReqApiDto implements UpdateEventDto {
  @IsInt()
  user_id: number;

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
  ticket_count: number;

  @IsOptional()
  @IsInt()
  ticket_price: number;

  @IsInt()
  lat: number;

  @IsInt()
  lng: number;

  @IsDate()
  created_at: Date;

  @IsDate()
  deleted_at: Date;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  date: Date;
}