import { CreateEventDto } from 'src/core/services/event/dtos';
import { IsInt, IsNumber, IsOptional, MaxLength, MinLength, IsDate, IsISO8601} from 'class-validator';

export class CreateEventReqApiDto implements CreateEventDto {
  @IsInt()
  category_id: number;

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

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;

  @IsOptional()
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsDate()
  deleted_at?: Date;

  @IsDate()
  @IsISO8601()
  date: Date;
}