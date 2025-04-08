import { NestFactory } from '@nestjs/core';
import { SeedersModule } from './seeders.module';
import { UsersSeeder } from './users.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedersModule);
  const seeder = app.get(UsersSeeder);
  seeder.addUsers();
  await app.close();
}
bootstrap();
