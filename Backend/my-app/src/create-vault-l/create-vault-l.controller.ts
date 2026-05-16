import { Controller, Post ,Body} from '@nestjs/common';
import { CreateVaultLService } from './create-vault-l.service';
import { UploadedFiles } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';



@Controller('uploadL')
export class CreateVaultLController {
    constructor(private readonly createVaultLService:CreateVaultLService){}

    @Post("Create")
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: memoryStorage(),
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
      async createVault(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: { title: string; desc: string, vaultId:string }
        
      ) {
    
        const keys = await this.createVaultLService.uploadFiles(files,body.title, body.desc, body.vaultId);
        return { title: body.title, desc: body.desc, vaultId: body.vaultId,files: keys };
      }


}
