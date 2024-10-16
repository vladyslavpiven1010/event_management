export interface UpdateUserDto {
  role_id?: number;
  company_id?: number;
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
  birth_date?: Date;
  gender?: string;
  created_at?: Date;
  deleted_at?: Date;
}