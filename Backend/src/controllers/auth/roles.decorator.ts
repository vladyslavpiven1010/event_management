import { SetMetadata } from '@nestjs/common';
import { ERole } from 'src/core/jwt-auth.guard';

export const ROLES_KEY = 'roles';

export const RequiredRoles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);