import express from "express";




export const upload = express.Router();


upload.get("/createVault/upload", (req,res)=>{
    res.render("upload");
})


upload.get("/ExistingVault/upload", (req,res)=>{
    res.render("uploadExisting");
})

upload.get("/getVault", (req,res)=>{
    res.render("getVault");
})








