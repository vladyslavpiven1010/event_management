import { CreateTicketDto } from 'src/core/services/ticket/dtos';
import { IsInt, Length } from 'class-validator';

export class CreateTicketReqApiDto implements CreateTicketDto {
  @IsInt()
  user_id: number;

  @IsInt()
  event_id: number;

  @Length(36)
  uuid: string;
}