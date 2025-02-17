// require('dotenv').config({ path: './.env' })
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from 'express'
import connectDB from './db/database.js';
const app = express();

const startServer=async()=>{
    try {
        await connectDB();
        app.get((req,res)=>{
            res.send("Server is running!");
        });
        const PORT = process.env.PORT|| 3000;
        app.listen(PORT,()=>{
            console.log(`🚀 Server is running on port ${PORT}`);
            
        })
        
    } catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
};

startServer();
