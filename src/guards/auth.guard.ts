import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export default class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req.session.userId;
  }
}
