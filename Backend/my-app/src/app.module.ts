import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { SignupModule } from './signup/signup.module';
import { SequelizeModule  } from '@nestjs/sequelize';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { CreateVaultModule } from './create-vault/create-vault.module';
import { UploadExistingModule } from './upload-existing/upload-existing.module';
import { GetVaultService } from './get-vault/get-vault.service';
import { GetVaultModule } from './get-vault/get-vault.module';
import { CreateVaultLController } from './create-vault-l/create-vault-l.controller';
import { CreateVaultLModule } from './create-vault-l/create-vault-l.module';
import { StoreKeysModule } from './store-keys/store-keys.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    SequelizeModule.forRoot({
    dialect:'postgres',
    host:process.env.DATABASE_URL,
    port:5432,
    username:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    autoLoadModels:true,
    logging:true,
    dialectOptions:{
      ssl:{
        require:true,
        rejectUnauthorized:true
      }
    }
    
  }),
    HomeModule, SignupModule, LoginModule, CreateVaultModule, UploadExistingModule, GetVaultModule, CreateVaultLModule, StoreKeysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
