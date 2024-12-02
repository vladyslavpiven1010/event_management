export interface ICreateComment {
    user_id: number;
    event_id: number;
    reply_to_id?: number;
    content: string;
    created_at?: Date;
}

export interface ICreateEvent {
    company_id: number;
    category_id: number;
    name: string;
    description?: string;
    format?: number;
    image_url?: string;
    wrapper_url?: string;
    ticket_count: number;
    ticket_price: number;
    date: string;
}

export interface ICreatePost {
    event_id: number;
    image_url?: string;
    title: string;
    content: string;
}
