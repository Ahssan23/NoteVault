import { Controller,Post,Body } from '@nestjs/common';
import { GetVaultService } from './get-vault.service';
import { getVaultDto } from './get-vault.dto';

@Controller('getVault')
export class GetVaultController {
    constructor(private getVaultService:GetVaultService){}


    @Post('getVaultId')
    async getVault(@Body() dto:getVaultDto){
        const data = await this.getVaultService.getVault(dto);    
        return {status:200, data:data}
    }


}
    