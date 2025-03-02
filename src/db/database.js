import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);  // Should log the MongoDB URI
console.log(process.env.DB_NAME);      // Should log "TubeVideo"

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1);
    }
};
export default connectDB