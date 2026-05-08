import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { decode } from "node:punycode";

dotenv.config();


export const home = express.Router();



home.get("/",  (req,res)=>{
    const token = req.cookies.access_token;
     verifyToken(token)

    if (verifyToken(token) === true){
        res.render("home", {loggedIn: true});
    }
    else{
        res.render("home", {loggedIn:false})
    }
})
 function verifyToken (token){try {
    
     const decoded =  jwt.verify(token, process.env.JWT_SECRET)
     
     return true
 } catch (error) {
return false
    
 
    }
   
}