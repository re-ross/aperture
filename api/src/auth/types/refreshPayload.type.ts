import { JwtPayload } from '.';

export type refreshPayload = JwtPayload & { refreshToken: string };
