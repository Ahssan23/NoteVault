import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import * as argon2 from "argon2";
import { Op } from 'sequelize';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User, private jwt:JwtService
    ){}


    

    async login(dto:LoginDto){
        const user_data = await this.userModel.findOne({
            where:{
                [Op.or]:[
                    {username:dto.username},
                    {email:dto.username}

                ]
            }
        })

        
        if(!user_data) {
            throw new UnauthorizedException("Invalid Credentials");

        }
        const verify_pass = await argon2.verify(user_data.password, dto.password)
        if(verify_pass === true){
            
            const data = {
                user_id:user_data.id
            }
            const jwt_token = await this.jwt.sign(data);

        return {
    access_token: jwt_token,   
}            
        }
        else throw new UnauthorizedException("Invalid Credentials");
        

    }

    async googleLogin(user:any){
        const token = this.jwt.sign({
            email:user.email,
            name:user.name
        });

        return {
            access_token:token,
            user:{
                email:user.email,
                name:user.name,
                picture:user.picture
            }
        }

    }
}


