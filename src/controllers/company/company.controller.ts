import { Body, Controller, Post, Get, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from 'src/core/services';
import { CreateCompanyReqApiDto } from './dto/create-companydto';
import { UpdateCompanyReqApiDto } from './dto/update-company.dto';
//import { CheckAuth, User } from 'src/guards';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  //@CheckAuth()
  async getCategories(): Promise<any> {
      const company = await this.companyService.findAll();
      return company;
  }

  @Get(':id')
  //@CheckAuth()
  async getCompany(@Param() params): Promise<any> {
      const company = await this.companyService.findOne(params.id);
      return company;
  }

  @Post()
  //@CheckAuth()
  async createCompany(@Body() companyDto: CreateCompanyReqApiDto): Promise<any> {
      console.log(companyDto)
      const company = await this.companyService.create(companyDto);
      return company;
  }

  @Patch(':id')
  //@CheckAuth()
  async updateCompany(@Param() params: number, @Body() companyDto: UpdateCompanyReqApiDto): Promise<any> {
      const company = await this.companyService.update(params["id"], companyDto);
      return company;
  }

  @Delete(':id')
  //@CheckAuth()
  async deleteCompany(@Param() params: number): Promise<any> {
      const company = await this.companyService.remove(params["id"]);
      return company;
  }
}
