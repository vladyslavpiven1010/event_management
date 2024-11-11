import { UserStatus } from "./enums";

/**
 * Interface that represents any entity.
 */
export interface Entity {
  id?: number;
}

export interface AccessTokenPayload {
  sub: number;
  ses?: number;
  sta: UserStatus;
}