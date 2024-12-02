export interface UpdateUserDto {
  username?: string;
  name?: string;
  email?: string;
  bio?: string;
  birth_date?: Date;
  gender?: string;
  created_at?: Date;
  deleted_at?: Date;
  refresh_token?: string;
}