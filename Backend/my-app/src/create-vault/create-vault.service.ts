import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand , ListObjectsV2Command, DeleteObjectCommand} from '@aws-sdk/client-s3';
import { v4 as uuid } from "uuid";
import 'multer';
import { Vault } from '../models/vault.model';
import { InjectModel } from '@nestjs/sequelize';
import { Files } from '../models/files.model';
import { createCipheriv,createDecipheriv,randomBytes, scryptSync } from 'crypto';





@Injectable()
export class CreateVaultService {
  private r2: S3Client;

  
  constructor(@InjectModel(Vault)
  private readonly vaultModel: typeof Vault,
  @InjectModel(Files) 
  private readonly filesModel: typeof Files,
) {



    this.r2 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_ID!,
      },
    });
  }

  // immage.png 
  //.split('p')
// ['image.' ,'ng']


  async uploadFiles(files: Express.Multer.File[] , title:string, desc:string, vaultId:string): Promise<string[]> {
    const uploadedKeys: string[] = [];

    // uploading file to bucket
    
    
    try{
    for (const file of files) {
      const ext = file.originalname.split('.').pop();
      const fileName = uuid()
      const key = `container/${vaultId}/${fileName}.${ext}`;
   
        await this.r2.send(new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ServerSideEncryption:'AES256'
        }));
        
      }
    }
      catch (error) {
        console.log(error)
        const res = await this.r2.send(new ListObjectsV2Command({
          Bucket:process.env.R2_BUCKET_NAME,
          Prefix:`container/${vaultId}`
        }))
        
        for(const e of res.Contents!){
          await this.r2.send(new DeleteObjectCommand({
            Bucket:process.env.R2_BUCKET_NAME,
            Key:e.Key
          }))
        }
        
        throw new InternalServerErrorException("Upload failed");
      }
      
    await this.storeVaultDb(title, desc, vaultId)
      return uploadedKeys ;
    }




      async storeVaultDb(title:string, desc:string, vaultId:string) :Promise<boolean>{
        await this.vaultModel.create({
          vaultId:vaultId
        })
        await this.filesModel.create({
          title:title,
          desc:desc,
          vaultId:vaultId
        })

        return true
      }


}