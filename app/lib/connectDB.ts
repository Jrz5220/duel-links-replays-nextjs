// Create database connection using mongoose

import mongoose from "mongoose";

if(!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    console.log("connectDB: a database connection has been requested...");
    // if connection is already established, use existing connection
    if(mongoose.connections[0].readyState) {
        console.log("connectDB: existing database connection detected");
        return true;
    }
    try {
        await mongoose.connect(uri);
        console.log("connectDB: Mongodb connected");
        return true;
    } catch(error: any) {
        throw new Error("connectDB: Error! " + error.message);
    }
}

export default connectDB;