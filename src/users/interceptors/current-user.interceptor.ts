import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export default class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session ?? {};
    if (userId) {
      const user = await this.userService.findOne(userId);
      req.user = user;
    }

    return handler.handle();
  }
}
