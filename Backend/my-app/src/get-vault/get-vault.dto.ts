import {IsString} from "class-validator"


export class getVaultDto{
    @IsString()
    vaultId!:string
}



