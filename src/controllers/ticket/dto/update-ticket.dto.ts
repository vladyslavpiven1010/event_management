import { UpdateTicketDto } from 'src/core/services/ticket/dtos';
import { IsInt, IsOptional, Length } from 'class-validator';

export class UpdateTicketReqApiDto implements UpdateTicketDto {
  @IsOptional()
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  event_id: number;

  @IsOptional()
  @Length(36)
  uuid: string;
}