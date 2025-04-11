import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@common/decorators/public.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
