import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, Req, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CompanyService, EventService, UserService } from 'src/core/services';
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
    private userService: UserService,
    private eventService: EventService)
    {}

  @Get()
  async getCompanies(): Promise<any> {
      const company = await this.companyService.findAll();
      return company;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Get('members')
  async getAllCompanyMembers(@Req() request: any): Promise<any> {
      const user = await this.userService.findOneById(request.user.sub);
      const members = await this.userService.findCompanyMembers(user.company_id.id);
      return members;
  }

  @Get('all_own_events')
  async getAllEventsOfCompany(@Req() request: any): Promise<any> {
    const user = await this.userService.findOneById(request.user.sub);
      const event = await this.eventService.findAllByCompany(user.company_id.id);
      return event;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Get(':id')
  async getCompany(@Param() params): Promise<any> {
      const company = await this.companyService.findOne(params.id);
      return company;
  }

  @RequiredRoles(ERole.USER)
  @Post()
  async createCompany(@Req() request: any, @Body() companyDto: CreateCompanyReqApiDto): Promise<any> {
    const company = await this.companyService.create(companyDto);
    await this.userService.updateToMember(request.user.id, company.id);

    return company;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Post('invite/:id')
  async inviteUser(@Req() request: any, @Param() params): Promise<void> {
    const user = await this.userService.findOneById(request.user.sub);
    const invited = await this.userService.findOneById(params["id"]);

    if (!invited) throw new BadRequestException("User with this credentials does not exist");
    
    return await this.userService.updateToMember(invited.id, user.company_id.id);
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Patch(':id')
  async updateCompany(@Req() request: any, @Param() params: number, @Body() companyDto: UpdateCompanyReqApiDto): Promise<any> {
    const user = await this.userService.findOneById(request.user.sub);
    const company = await this.companyService.findOne(params["id"]);

    if (!company) throw new BadRequestException("Company with this credentials does not exist");
    if (request.user.role !== ERole.ADMIN && user.company_id.id !== company.id) 
      throw new ForbiddenException('You do not have permission to update this company');
    
    const updatedCompany = await this.companyService.update(params["id"], companyDto);
    return updatedCompany;
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Post('kick_out/:id')
  async kickOutUser(@Req() request: any, @Param() params: any): Promise<void> {
    const user = await this.userService.findOneById(request.user.sub);
    const kicked_user = await this.userService.findOneById(params["id"]);

    if (!kicked_user) throw new BadRequestException("User with this credentials does not exist");
    if (request.user.role !== ERole.ADMIN && user.company_id.id !== kicked_user.company_id.id) 
      throw new ForbiddenException('You do not have permission to kick out user from this company');

    await this.companyService.kickOutUser(params["id"]);
  }

  @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
  @Delete(':id')
  async deleteCompany(@Req() request: any, @Param() params: number): Promise<any> {
    const user = await this.userService.findOneById(request.user.sub);
    const company = await this.companyService.findOne(params["id"]);
    
    if (!company) throw new BadRequestException("Company with this credentials does not exist");
    if (request.user.role !== ERole.ADMIN && user.company_id.id !== company.id) 
      throw new ForbiddenException('You do not have permission to update this company');

    await this.companyService.kickOutAllUsers(company.id);
    const deletedCompany = await this.companyService.remove(params["id"]);
    return deletedCompany;
  }
}
