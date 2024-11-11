export interface IRegisterUser {
    phone: string;
    password: string;
    password_confirmation: string;
}

export interface ILoginUser {
    login: string;
    password: string;
}

export enum UserStatus {
    Unverified = 0,
    VerifiedByPhone,
    Created,
    Suspended,
    Deleted,
  }

export interface IUser {
    id: number;
    username: string;
    email_primary?: string;
    phone_primary: string;
    created_at: string;
    updated_at: string;
    status: UserStatus;
}