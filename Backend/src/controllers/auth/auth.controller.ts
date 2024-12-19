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
    try {
      await this.authService.register(registerUserDto);
    } catch (error) {
      console.error('Error during registration:', error.message, error.stack);
      throw error;
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Body('accessToken') accessToken: string) {
    try {
      const newAccessToken = await this.authService.refreshToken(accessToken);
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
