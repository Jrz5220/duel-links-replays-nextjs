// Create database connection using mongodb

import { MongoClient } from "mongodb";

if(!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client
let clientPromise: Promise<MongoClient>;
/*
create a global variable that holds the mongodb connection.
we can use this global variable anywhere in our app to get
our connection to the database instead of creating new
connections anytime we need to access the database.
this prevents us from exhausting the connection pool.
*/
let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>
}

if(process.env.NODE_ENV === "development") {
    console.log("this app is in development mode");
    if(!globalWithMongo._mongoClientPromise) {
        console.log("global database connection is not set");
        client = new MongoClient(uri, options);
        // connect to the mongodb database
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
    console.log("global database connection has been set: " + clientPromise);
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    console.log("global database connection has been set: " + clientPromise);
}

export default clientPromise;