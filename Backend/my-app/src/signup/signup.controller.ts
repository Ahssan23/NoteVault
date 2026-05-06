import { Controller, Post,Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './signup.dto';

@Controller('signup')
export class SignupController {
    constructor(private signupService:SignupService){}

    @Post("createUser")
    async createUser(@Body() dto:SignupDto){
        return await this.signupService.Signup(dto);
        
    }

}
