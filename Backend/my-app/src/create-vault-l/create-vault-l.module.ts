import { Module } from '@nestjs/common';
import { CreateVaultLService } from './create-vault-l.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Files } from 'src/models/files.model';
import { CreateVaultLController } from './create-vault-l.controller';
import { Vault } from 'src/models/vault.model';

@Module({
  imports:[SequelizeModule.forFeature([Files,Vault])],
  controllers:[CreateVaultLController],
  providers: [CreateVaultLService]
})
export class CreateVaultLModule {}
