import { CreateEventDto } from 'src/core/services/event/dtos';
import { IsInt, IsOptional, MaxLength, MinLength , IsISO8601} from 'class-validator';

export class CreateEventReqApiDto implements CreateEventDto {
  @IsInt()
  company_id: number;

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
  format?: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  image_url?: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  wrapper_url?: string;

  @IsInt()
  ticket_count: number;

  @IsInt()
  ticket_price: number;

  @MinLength(1)
  @MaxLength(256)
  date: Date;
}