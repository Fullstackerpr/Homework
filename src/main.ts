import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv';
config()

async function bootstrap() {
  const PORT = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log('server running on port: ',PORT));
}
bootstrap();
