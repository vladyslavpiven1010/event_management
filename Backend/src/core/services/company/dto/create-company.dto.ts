export interface CreateCompanyDto {
  name: string;
  description: string;
  country_code: string;
  is_verified: boolean;
}