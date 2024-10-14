import { Event, User } from "src/core/entities";

export interface CreateTicketDto {
    user_id: number;
    event_id: number;
    created_at: Date;
    deleted_at: Date;
}