import { UpdateTicketDto } from 'src/core/services/ticket/dtos';
import { IsInt, IsOptional, IsDate } from 'class-validator';

export class UpdateTicketReqApiDto implements UpdateTicketDto {
  @IsOptional()
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  event_id: number;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  deleted_at: Date;
}