export interface UpdateEventDto {
  category_id?: number;
  name?: string;
  description?: string;
  ticket_count?: number;
  ticket_price?: number;
  lat?: number;
  lng?: number;
  date?: Date;
}