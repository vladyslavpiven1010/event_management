import { Controller, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/core/services';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtAuthGuard } from 'src/core/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      const newAccessToken = await this.authService.refreshToken(refreshToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }
}

// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiZXhhbXBsZTNAZ21haWwuY29tIiwicm9sZSI6MSwiaWF0IjoxNzMxNDkwODE0LCJleHAiOjE3MzE0OTE3MTR9.88QNPm_kdCCx1hr1XnHwf8tEGQORqTwReudVX_7cC5c",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiZXhhbXBsZTNAZ21haWwuY29tIiwicm9sZSI6MSwiaWF0IjoxNzMxNDkwODE0LCJleHAiOjE3MzIwOTU2MTR9.pu1PFMZXmQdwwbJHDg34JAu0ts-1bzBP6t-xGGwHJlc"