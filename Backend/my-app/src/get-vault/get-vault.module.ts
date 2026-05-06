import { Module } from '@nestjs/common';
import { GetVaultController } from './get-vault.controller';
import { GetVaultService } from './get-vault.service';

@Module({
  providers:[GetVaultService],
  controllers: [GetVaultController]
})
export class GetVaultModule {}
