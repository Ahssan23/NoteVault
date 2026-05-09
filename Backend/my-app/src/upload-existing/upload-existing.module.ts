import { Module } from '@nestjs/common';
import { UploadExistingService } from './upload-existing.service';
import { UploadExistingController } from './upload-existing.controller';
import { Files } from 'src/models/files.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports :[SequelizeModule.forFeature([Files])],
  providers: [UploadExistingService],
  controllers: [UploadExistingController]
})
export class UploadExistingModule {}
