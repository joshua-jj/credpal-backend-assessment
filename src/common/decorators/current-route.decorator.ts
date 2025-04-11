import { HelperUtil } from '@common/utils/helper.util';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentRoute = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return HelperUtil.getCurrentRoute(request);
  },
);
