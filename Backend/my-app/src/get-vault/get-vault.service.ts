    import { Injectable } from '@nestjs/common';
    import { S3Client, GetObjectCommand ,ListObjectsV2Command} from '@aws-sdk/client-s3';
    import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
    import dotenv, { decrypt } from "dotenv";
    import { InjectModel } from '@nestjs/sequelize';
    import { HSTORE } from 'sequelize';
    import { encryptBuffer } from 'src/utilis/crypto.utilis';
    import { AuthGuard } from '@nestjs/passport';
    import { decryptBuffer } from 'src/utilis/decrypt.utilis';
    import { Files } from '../models/files.model';
import { Vault } from 'src/models/vault.model';

    dotenv.config();



    @Injectable()
    export class GetVaultService {
        private r2 : S3Client;
        constructor(@InjectModel(Files) private readonly filesModel: typeof Files){
            this.r2= new S3Client({
                region: 'auto',
        endpoint: process.env.R2_ENDPOINT!,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_ID!,
            secretAccessKey: process.env.R2_SECRET_ACCESS_ID!,
        },
    })  
}

async getVault(dto) {
    const prefix = `container/${dto.vaultId}`;
    
    const listResponse = await this.r2.send(new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME,
        Prefix: prefix,
    }));

    const data = await Promise.all(
        listResponse.Contents?.map(async (e) => {
            const response = await this.r2.send(new GetObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: e.Key,
            }));

            const buffer = Buffer.from(
                await response.Body?.transformToByteArray()!
            );

            const { iv, authtag, originalmimetype, originalname } = response.Metadata!;

            const plainBuffer = decryptBuffer(buffer, iv, authtag);
            
            return {
                key: e.Key,
                name: originalname,
                mimetype: originalmimetype,
                data: plainBuffer.toString('base64'), // <-- 'data' not 'buffer'
            };
        }) ?? []
    );

    const metadata= await this.getFileData(dto.vaultId)
    
    
    return { // <-- status wraps the whole thing, not per file
        metadata:metadata,
        data,
    };
}   
        async getFileData(vaultId:string){
            const fileData = this.filesModel.findAll({
                where:{
                    vaultId:vaultId
                }
            })
            return fileData;

        
    }


    }












