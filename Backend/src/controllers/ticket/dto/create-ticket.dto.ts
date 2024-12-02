import { CreateTicketDto } from 'src/core/services/ticket/dtos';
import { IsDate, IsInt } from 'class-validator';

export class CreateTicketReqApiDto implements CreateTicketDto {
  @IsInt()
  event_id: number;
}