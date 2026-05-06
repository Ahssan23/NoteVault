import { NestFactory } from '@nestjs/core';
import { CreateVaultModule } from './create-vault.module';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.create(CreateVaultModule);
  app.enableCors({
  origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
})
  await app.listen(3000);
}
bootstrap();
