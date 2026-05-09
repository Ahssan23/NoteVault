import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand ,ListObjectsV2Command} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from "dotenv";
import { InjectModel } from '@nestjs/sequelize';
import { Files } from '../models/files.model';
dotenv.config();



@Injectable()
export class GetVaultService {
    private r2 : S3Client;
    constructor(){
        this.r2= new S3Client({
            region: 'auto',
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_ID!,
      },
        })  
    }


    async getVault(dto){
        const prefix = `container/${dto.vaultId}`

        const command =  new ListObjectsV2Command({
            Bucket:process.env.R2_BUCKET_NAME,
            Prefix:prefix
        })
          const listResponse = await this.r2.send(command);
          


        const data = await Promise.all(

            listResponse.Contents?.map(async (e)=>{
                const command =  new GetObjectCommand({
                    Bucket:process.env.R2_BUCKET_NAME,
                    Key:e.Key
                })
                const url =await getSignedUrl(this.r2, command,{ expiresIn :3600});
                
                return url;
                
                
            })?? []
        )
        
        return data;
    }

    // async getFileData(vaultId:string){
    //     const fileData = this.filesModel.findAll({
    //         where:{
    //             vaultId:vaultId
    //         }
    //     })
    //     return fileData;

    
}















