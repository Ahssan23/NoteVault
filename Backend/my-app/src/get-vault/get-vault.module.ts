import { Module } from '@nestjs/common';
import { GetVaultController } from './get-vault.controller';
import { GetVaultService } from './get-vault.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Files } from '../models/files.model';

@Module({
  imports :[SequelizeModule.forFeature([Files])],
  providers:[GetVaultService],
  controllers: [GetVaultController]
})
export class GetVaultModule {}
