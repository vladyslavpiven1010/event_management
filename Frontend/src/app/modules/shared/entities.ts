import { ESorting } from "./enums";

export interface Entity {
    id: number;
}

export interface ICategory extends Entity {
    name: string;
}

export interface IComment extends Entity {
    user_id: number;
    event_id: number;
    reply_to_id?: number;
    content: string;
    created_at: Date;
}

export interface IEvent extends Entity {
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
    created_at: Date;
}

export interface IPost extends Entity {
    event_id: number;
    image_url?: string;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface ITicket extends Entity {
    user_id: number;
    event_id: number;
    uuid: string;
}

export interface IUserEvent extends Entity {
    user_id: number;
    event_id: number;
    is_receiving_post: boolean;
    is_receiving_comment: boolean;
}

export interface WhereOptions {
    [keys: string]: any;
}

  export interface OrderByOptions {
    [keys: string]: 'ASC' | 'DESC';
}

export interface QueryOptions {
    where?: WhereOptions;
    orderBy?: OrderByOptions;
    offset?: number;
    limit?: number;
}

export interface IFilters {
    filterFormat: number,
    filterCategory: number
}

export interface FindOptions {
    filters: IFilters,
    sort: ESorting
}

export interface ICompany extends Entity {
    name: string
}