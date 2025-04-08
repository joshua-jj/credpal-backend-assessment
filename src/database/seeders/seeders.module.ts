import { TDatabaseConfig } from '@common/types/config.type';
import configuration from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSeeder } from './users.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TDatabaseConfig>('database'),
    }),
  ],
  providers: [UsersSeeder],
})
export class SeedersModule {}
