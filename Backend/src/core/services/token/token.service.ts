import { Injectable, NotImplementedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from 'src/core/entities';
/**
 * Class that represents user service. It contains business logic of authentication process.
 */
@Injectable()
export class TokenService {
  constructor(private _jwtService: JwtService) {}

  public signAccessToken(userId: number, userStatus: number, sessionId?: number): string {
    const payload: AccessTokenPayload = {
      sub: userId,
      ses: sessionId ? sessionId : null,
      sta: userStatus,
    };
    return this._jwtService.sign(payload);
  }

  public verifyAccessToken(token: string): AccessTokenPayload {
    return this._jwtService.verify(token);
  }
}
