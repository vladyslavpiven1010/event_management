export interface CreateCompanyDto {
  user_id: number;
  name: string;
  description: string;
  country_code: string;
  is_verified: boolean;
  created_at: Date;
  deleted_at: Date;
}