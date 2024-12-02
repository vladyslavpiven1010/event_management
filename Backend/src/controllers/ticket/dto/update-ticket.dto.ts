import { UpdateTicketDto } from 'src/core/services/ticket/dtos';
import { IsInt, IsOptional, IsDate } from 'class-validator';

export class UpdateTicketReqApiDto implements UpdateTicketDto {
  @IsOptional()
  @IsInt()
  event_id: number;
}