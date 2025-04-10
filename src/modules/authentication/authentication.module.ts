import { AuthenticationGuard } from '@common/guards/authentication.guard';
import { JwtConfig } from '@common/types/config.type';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LoggerModule } from '@common/logger/logger.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtConfig>('jwt');
        return {
          global: true,
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.expiresIn,
          },
        };
      },
    }),
    UsersModule,
    LoggerModule
  ],
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
