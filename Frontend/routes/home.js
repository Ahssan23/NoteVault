import express from "express";


export const home = express.Router();



home.get("/", (req,res)=>{
    res.render("home");
})