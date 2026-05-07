import { Module } from '@nestjs/common';
import { CreateVaultService } from './create-vault.service';
import { CreateVaultController } from './create-vault.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vault } from '../models/vault.model';
import { Files } from '../models/files.model';

@Module({
  imports:[SequelizeModule.forFeature([Vault, Files])],
  providers: [CreateVaultService],
  controllers: [CreateVaultController]
})
export class CreateVaultModule {}
