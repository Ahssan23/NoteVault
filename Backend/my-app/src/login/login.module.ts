import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from '../stratergies/google.stratergy';

@Module({
  imports:[SequelizeModule.forFeature([User]),
 JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '2h' },
  }),
})
],

  controllers: [LoginController],
  providers: [LoginService, GoogleStrategy]
})  
export class LoginModule {}
