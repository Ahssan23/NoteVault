import { Module } from '@nestjs/common';
import { CreateVaultService } from './create-vault.service';
import { CreateVaultController } from './create-vault.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vault } from '../models/vault.model';

@Module({
  imports:[SequelizeModule.forFeature([Vault])],
  providers: [CreateVaultService],
  controllers: [CreateVaultController]
})
export class CreateVaultModule {}
