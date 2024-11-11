export interface UpdateTicketDto {
  user_id: number;
  event_id: number;
  created_at?: Date;
  deleted_at?: Date;
}