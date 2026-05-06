import {Router} from "express";



export const signup = Router();



signup.get("/signup", async(req,res)=>{
    res.render("signup")
})