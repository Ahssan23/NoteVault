import { createCipheriv, createDecipheriv } from "crypto";
import { encryptBuffer } from "./crypto.utilis";



const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.FILE_ENCRYPTION_KEY!, 'hex');


export function decryptBuffer(
    encryptedBuffer:Buffer,
    iv:string,
    authTag:string,

):Buffer{
    const decipher = createDecipheriv(
        ALGORITHM,
        KEY,
        Buffer.from(iv,'hex')
    )
    decipher.setAuthTag(Buffer.from(authTag,'hex'));

    return Buffer.concat([
        decipher.update(encryptedBuffer)    ,
        decipher.final(),
    ])
}
