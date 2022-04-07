import { refreshPayload } from './../../auth/types/refreshPayload.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const GetCurrentUser = createParamDecorator(
  (data: keyof refreshPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
