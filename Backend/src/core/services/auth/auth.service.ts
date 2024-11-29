import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto';
import { User } from 'src/core/entities';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(user: RegisterUserDto): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userService.create({
      name: user.name,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      role_id: 1
    });

    return newUser;
  }

  async login(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role_id.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.tokenService.saveToken(accessToken, refreshToken, user);

    return {accessToken, refreshToken};
  }

  async refreshToken(oldRefreshToken: string): Promise<string> {
    const tokenEntity = await this.tokenService.findByRefreshToken(oldRefreshToken);
    if (!tokenEntity || !tokenEntity.is_valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      const payload = this.jwtService.verify(oldRefreshToken, { secret: 'sdfsdf' });
      const user = await this.userService.findOneById(payload.sub);

      const newAccessToken = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role_id.id }, { expiresIn: '15m' });
      return newAccessToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(token: string) {
    await this.tokenService.invalidateToken(token);
  }
}