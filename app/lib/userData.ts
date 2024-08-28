import connectDB from "./connectDB";
import Users from "../models/user";

export default async function getUsers() {
    console.log("requesting database connection please");
    await connectDB();
    console.log("database connection returned successfully. Thanks!");
    try {
        console.log("requesting all users in database please")
        const results = await Users.find({});    // User.find({}) returns an object
        console.log("database users returned successfully. Thanks!");
        return {users: results};
    } catch(error: any) {
        return {errorMsg: "User model failed to find users: " + error.message};
    }
}