import { createCipheriv, randomBytes } from "crypto";


const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.FILE_ENCRYPTION_KEY!, 'hex')




export function encryptBuffer(plainBuffer:Buffer) :{
    encryptedBuffer:Buffer;
    iv:string;
    authTag:string;

}{
const iv = randomBytes(12);
const cipher = createCipheriv(ALGORITHM,KEY,iv)

const encrypted = Buffer.concat([
    cipher.update(plainBuffer),
    cipher.final()
])


const authTag = cipher.getAuthTag()

return {
    encryptedBuffer: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
}
}