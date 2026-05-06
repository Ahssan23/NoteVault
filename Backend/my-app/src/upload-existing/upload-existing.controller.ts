import { Controller , Post,Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UploadExistingService } from './upload-existing.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('upload')
export class UploadExistingController {

    constructor(private uploadExistingService :UploadExistingService){}
// vault id --> find same dir in r2 --> add into shit.
    @Post('uploadExisting')
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage:memoryStorage(),
        limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
    fileFilter: (req, file, cb) => {
      const allowed = [
        'image/jpeg', 'image/png', 'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
      ];    
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('File type not allowed'), false);
      }
    }
    }))
    async uploadExisting(@Body() body:{title:string, desc:string, vaultId:string}, @UploadedFiles() files:Express.Multer.File[]){
      const upload = await this.uploadExistingService.uploadFile(files,body.title, body.desc ,body.vaultId);
      return upload;
    }

}
