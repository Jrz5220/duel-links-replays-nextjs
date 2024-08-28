import NextAuth from "next-auth";
import { authConfig } from './auth.config';
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "./app/models/user";
import clientPromise from "./lib/db";
import bcrypt from "bcrypt";    // add type definitions for bcrypt: npm install --save @types/bcrypt
import { z } from "zod";

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                // credentials is an object containing the input values from your login form
                // for example, if your login form has <input name="username">, credentials will hold { username: "<value>" }
                // if the input is <input name="email">, credentials will hold { email: "<value>" }
                const parsedCredentials = z.object({ username: z.string(), password: z.string().min(8) }).safeParse(credentials);
                // you need to ensure the credentials object returns string data types by parsing it using zod
                if(parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    // check to see if the username exists in the database
                    const user = await User.findOne({username: username});    // null returned if not found
                    if(!user) return null;
                    // use bcrypt to validate password
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if(passwordsMatch) return user;
                }
                console.log("invalid credentials");
                return null;
            }
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
});