import { CreateEventDto } from 'src/core/services/event/dtos';
import { IsInt, IsOptional, MaxLength, MinLength, IsDate} from 'class-validator';

export class CreateEventReqApiDto implements CreateEventDto {
  @IsInt()
  user_id: number;

  @IsInt()
  category_id: number;

  @MinLength(1)
  @MaxLength(256)
  name: string;

  @IsOptional()
  @MaxLength(4096)
  description?: string;

  @IsInt()
  ticket_count: number;

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

  @MinLength(1)
  @MaxLength(256)
  date: Date;
}