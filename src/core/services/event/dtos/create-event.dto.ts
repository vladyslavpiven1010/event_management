export interface CreateEventDto {
    company_id: number;
  category_id: number;
  name: string;
  description?: string;
  format?: number;
  image_url?: string;
  wrapper_url?: string;
  ticket_count: number;
  ticket_price: number;
  date: Date;
}