import { Module } from '@nestjs/common';
import { UploadExistingService } from './upload-existing.service';
import { UploadExistingController } from './upload-existing.controller';

@Module({
  providers: [UploadExistingService],
  controllers: [UploadExistingController]
})
export class UploadExistingModule {}
