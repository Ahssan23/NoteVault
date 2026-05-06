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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    SequelizeModule.forRoot({
    dialect:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'root',
    database:'notevault',
    autoLoadModels:true,
    logging:true,
    
  }),
    HomeModule, SignupModule, LoginModule, CreateVaultModule, UploadExistingModule, GetVaultModule],
  controllers: [],
  providers: [GetVaultService],
})
export class AppModule {}
