import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  providers: [SignupService],
  controllers: [SignupController]
})
export class SignupModule {}
