import { ESorting, Roles } from "./enums";

export interface Entity {
    id: number;
}

export interface IUser extends Entity {
    username: string
    name: string
    email: string
    password: string
    role_id: Roles
    company_id?: number
    bio?: string
    birth_date?: string
    gender?: string
    is_verified: boolean
    created_at: Date
    deleted_at: Date
}

export interface ICategory extends Entity {
    name: string;
    description: string;
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
    deleted_at: Date;
    lat: number;
    lng: number;
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

  export interface OrderByOptions {
    [keys: string]: 'ASC' | 'DESC';
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
    description: string
    country_code: string
    is_verified: boolean
    created_at: Date
    deleted_at?: Date
}