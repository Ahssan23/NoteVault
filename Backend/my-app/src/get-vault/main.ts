import { NestFactory } from '@nestjs/core';
import { GetVaultModule } from './get-vault.module';


async function bootstrap() {
  // Pass your module here instead of AppModule
  const app = await NestFactory.create(GetVaultModule); 
  
  await app.listen(3000);
}
bootstrap();