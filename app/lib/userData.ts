import connectDB from "./connectDB";
import Users from "../models/user";

// this function is used in duelData.ts

export default async function getUsers() {
    console.log("requesting database connection please");
    await connectDB();
    console.log("database connection returned successfully. Thanks!");
    try {
        console.log("requesting all users in database please");
        const results = await Users.find({});    // User.find({}) returns an object
        console.log("database users returned successfully. Thanks!");
        return {users: results};
    } catch(error: any) {
        console.log("ERROR ALERT: error caught in app/lib/userData.ts getUsers()")
        return {errorMsg: "User model failed to find users. " + error.message};
    }
}