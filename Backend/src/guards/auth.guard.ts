// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   SetMetadata,
//   UnauthorizedException,
//   createParamDecorator,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
// import { TokenExpiredError } from 'jsonwebtoken';
// import { TokenService } from 'src/core/services/token/token.service';

// export enum UserStatus {
//   Unverified = 0,
//   VerifiedByPhone,
//   Created,
//   Suspended,
//   Deleted,
// }

// export interface ContextUser {
//   id: number;
//   session_id: number;
//   status: UserStatus;
// }

// export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
//   const request = ctx.switchToHttp().getRequest();
//   return request.user as ContextUser;
// });

// export function CheckAuth(allowedStatuses: UserStatus[] = [UserStatus.Created]) {
//   return SetMetadata('allowedStatuses', allowedStatuses);
// }

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private _reflector: Reflector, private _tokenService: TokenService) {}

//   public async canActivate(context: ExecutionContext): Promise<boolean> {
//     try {
//       const allowedStatuses = this._reflector.get<UserStatus[]>('allowedStatuses', context.getHandler());
//       if (!allowedStatuses) return true;

//       const request: Request = context.switchToHttp().getRequest();
//       const token = request.headers['authorization'].split(' ')[1];
//       const payload = this._tokenService.verifyAccessToken(token);
//       request['user'] = {
//         id: payload.sub,
//         session_id: payload.ses,
//         status: payload.sta,
//       } as ContextUser;

//       if (allowedStatuses.find(status => status === payload.sta) === undefined) {
//         return false;
//       }

//       return true;
//     } catch (error) {
//       if (error instanceof TokenExpiredError) throw new UnauthorizedException('Access token is expired.');
//       else throw new UnauthorizedException('Access token is invalid.');
//     }
//   }
// }