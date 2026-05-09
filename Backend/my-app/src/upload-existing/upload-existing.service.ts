import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import dotenv from "dotenv";
import {v4 as uuid }from "uuid";
import 'multer';
import { Files } from 'src/models/files.model';
import { InjectModel } from '@nestjs/sequelize';


dotenv.config();

@Injectable()
export class UploadExistingService {
    private r2: S3Client;

    constructor(@InjectModel(Files) private readonly filesModel :typeof Files) {
        this.r2 = new S3Client({
            region: 'auto',
            endpoint: process.env.R2_ENDPOINT!,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_ID!,
                secretAccessKey: process.env.R2_SECRET_ACCESS_ID!,
            },
        });
    }
    async uploadFile(file:Express.Multer.File[],title:string, desc:string , vaultId:string){
        try{

            const existing = await this.r2.send(new ListObjectsV2Command({
                Bucket:process.env.R2_BUCKET_NAME,
                Prefix:`container/${vaultId}`,
            
            }))
            
            let prefix;
            for(const i of existing.Contents!){
                    prefix = i.Key?.split('/')
                    
            }
            
                for(const f of file){
                    const ext = f.originalname.split('.').pop();
                    const key = `container/${prefix![1]}/${uuid()}.${ext}`

                    await this.r2.send(new PutObjectCommand({
                        Bucket:process.env.R2_BUCKET_NAME,
                        Key:key,
                        Body:f.buffer,
                        ContentType:f.mimetype,

                    }))
                    this.addToDb(title, desc, vaultId)
                    
                }
            }catch(err){
                console.log(err);

            }
            }

    async addToDb(title:string, desc:string, vaultId:string):Promise<boolean>{
        try{

            await this.filesModel.create({
                title:title,
                desc:desc,
                vaultId:vaultId
            })
            
            return true;
        }catch(err){
            console.log(err)
            return false;
        }
    }

}