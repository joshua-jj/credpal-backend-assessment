import { AuthenticationGuard } from '@common/guards/authentication.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AuthenticationModule {}
