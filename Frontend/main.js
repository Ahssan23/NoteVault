    import express from "express";
    import dotenv from "dotenv";
    import {signup} from "./routes/signup.js"
    import {login} from "./routes/login.js";
    import { upload } from "./routes/upload.js";

    dotenv.config();


    const app = express();
  

app.use(express.static('public'));


    app.set("view engine", "ejs");

    const port = process.env.PORT;
    const host = process.env.HOST;


    app.use(signup);  
    app.use(login);  
    app.use(upload);

    app.listen(port,()=>{
        console.log("FRONTEND SERVER IS RUNNING......")
    } )