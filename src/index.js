// require('dotenv').config({ path: './.env' })
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from 'express'
import connectDB from './db/database.js';
const app = express();

connectDB().then(
    ()=>{
        app.listen(process.env.PORT||8000,()=>{
            console.log(`Server is running at port : ${process.env.PORT}`);
            
        })
    }).catch(
        (err)=>{
            console.log("Mongo DB connection failed !!!",err);
        })

