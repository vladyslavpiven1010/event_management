import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CompanyService, UserService } from 'src/core/services';
import { CreateCompanyReqApiDto } from './dto/create-companydto';
import { UpdateCompanyReqApiDto } from './dto/update-company.dto';
import { JwtAuthGuard, ERole } from 'src/core/jwt-auth.guard';
import { RequiredRoles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('company')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(
    private companyService: CompanyService, 
    private userService: UserService) 
    {}

  @Get()
  async getCompanies(): Promise<any> {
      const company = await this.companyService.findAll();
      return company;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Get(':id')
  async getCompany(@Param() params): Promise<any> {
      const company = await this.companyService.findOne(params.id);
      return company;
  }

  @Post()
  async createCompany(@Request() req, @Body() companyDto: CreateCompanyReqApiDto): Promise<any> {
    const company = await this.companyService.create(req.user.userId, companyDto);
    return company;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Patch(':id')
  async updateCompany(@Param() params: number, @Body() companyDto: UpdateCompanyReqApiDto): Promise<any> {
      const company = await this.companyService.update(params["id"], companyDto);
      return company;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Delete(':id')
  async deleteOwnCompany(@Param() params: number): Promise<any> {
    const company = await this.companyService.remove(params["id"]);
    return company;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Delete('any/:id')
  async deleteCompany(@Param() params: number): Promise<any> {
    const company = await this.companyService.remove(params["id"]);
    return company;
  }
}
