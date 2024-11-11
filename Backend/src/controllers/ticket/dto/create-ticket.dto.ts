import { CreateTicketDto } from 'src/core/services/ticket/dtos';
import { IsDate, IsInt } from 'class-validator';

export class CreateTicketReqApiDto implements CreateTicketDto {
  @IsInt()
  user_id: number;

  @IsInt()
  event_id: number;

  @IsDate()
  created_at: Date;

  @IsDate()
  deleted_at: Date;
}