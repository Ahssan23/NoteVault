import { NestFactory } from '@nestjs/core';
import { GetVaultModule } from './get-vault.module';

async function bootstrap() {
  const app = await NestFactory.create(GetVaultModule);
  app.enableCors({
  origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
})
  await app.listen(3000);
}
bootstrap();
