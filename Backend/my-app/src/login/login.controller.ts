import { Controller ,Post,Body,Get, UseGuards,Res ,Req} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';


const FRONTEND_URL = 'https://notevault-1-pmjq.onrender.com';


@Controller('login')
export class LoginController {
    constructor(private loginService:LoginService){}

    @Post('login')
    async login(@Body() dto:LoginDto, @Res() res:Response){
        const login =  await this.loginService.login(dto);
        res.cookie('access_token' , login.access_token ,{httpOnly:true})
        res.json({status:200})
        
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
  async googleAuth() {

  }

   @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res:Response) {
    
     const callback = await this.loginService.googleLogin(req.user);
     res.cookie('access_token' ,callback.access_token , {httpOnly:true})
     res.redirect(FRONTEND_URL)
    // return "nothing"
  }

};
