import express from "express";


export const login = express.Router();



login.get("/login", (req,res)=>{
    res.render("login");
})