import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import * as argon2 from 'argon2';
import { UniqueConstraintError } from 'sequelize';


@Injectable()
export class SignupService {
    constructor(
        @InjectModel(User)
        private readonly userModel:typeof User){}

    async Signup(dto){
        try{

            if(dto.username.length == 0|| dto.email.length ==0 || dto.password.length == 0 ){
                return {status:400, message:"missing field"};
            }
            // add data to the db 
            const hashed_pass = await argon2.hash(dto.password, {
                type:argon2.argon2id,
                memoryCost:2**16,
                timeCost:3,
                parallelism:1
            })
            console.log(hashed_pass)
            await this.userModel.create({
                email:dto.email,
                username:dto.username,
                password:hashed_pass
            })
            
            return {status:200, message:"user created"};
            
        }catch(err){
            if(err instanceof UniqueConstraintError){
                console.log(err.fields)
                const field = Object.keys(err.fields);
                return {status:409,message:`${field} already exists`};

            }
        }
    }
}
