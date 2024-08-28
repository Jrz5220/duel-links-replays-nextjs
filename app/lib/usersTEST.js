// testing database connection using mongodb

import clientPromise from "@/lib/db";

let client
let db
let users

async function init() {
    if(db) {
        console.log("database connection already established: " + db);
        return
    }
    try {
        console.log("attempting database connection...");
        client = await clientPromise;
        db = client.db();
        console.log("creating database instance...");
        users = db.collection('users');
        console.log("getting 'users' collection from database...");
        console.log("succesfully connected to database" + "\nusers: " + users.name);
    } catch(e) {
        throw new Error('Failed to establish connection to database');
    }
}

// call the init function to create the db connection when this module loads
;(async () => {
    console.log("initializing database connection...");
    await init();
})();

export async function getUsers() {
    try {
        if(!users) {
            console.log("failed to retrieve 'users' collection from database");
            await init();
        }
        console.log("creating array of users...");
        const result = await users
            .find({})
            .limit(5)
            // the user id is stored as an ObjectId in mongo, so you have to convert it to a string
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray();     // convert the db cursor returned by mongo into an array
        console.log("array complete. returning " + result.length + " users");
        return { users: result };
    } catch(e) {
        return { error: 'Failed to fetch users' };
    }
}