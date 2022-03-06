import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    //req 안에 전체 req가 들어가 있는 형태
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
