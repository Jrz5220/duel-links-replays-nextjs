'use server';

// connect the auth sign-in logic with your login form
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import User from '../models/user';
import { v4 as uuidv4 } from "uuid";
import { redirect } from 'next/navigation';

export async function authenticate(prevState: string | undefined, formData: FormData,) {
    try {
        console.log("authenticate form data: " + JSON.stringify(formData));
        await signIn('credentials', formData);
      } catch (error) {
            // NextAuth.js errors: https://authjs.dev/reference/core/errors/
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        return 'Invalid credentials.';
                    default:
                        return 'Something went wrong.';
                }
            }
            throw error;
    }
}

export async function register(prevState: string | undefined, formData: FormData) {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const matchingPassword = formData.get("confirmPwd")?.toString();
    const email = formData.get("email")?.toString();
    const pwdChecker = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/);
    const bcrypt = require("bcrypt");

    if(!username || !password || !matchingPassword || !email) return "Please fill out all fields"; // value gets assigned to prevState, so has to be of same type as prevState (string)

    // Promise.allSettled() accepts an iterable of promises to execute at the same time.
    // returns a single promise with an array of results from each executed promise.
    // if the promise in the iterable resolved, the array stores {"status": "fulfilled", "value": "value_returned_by_promise"} for that promise
    // if the promise in the iterable rejected, the array stores {"status": "rejected"} for that promise
    const [usernameExists, emailExists] = await Promise.allSettled([User.findOne({username: username}).exec(), User.findOne({email: email}).exec()]);

    if(usernameExists.status.localeCompare("fulfilled") === 0) {
        if(usernameExists.value != null) return "Username already exists";
    }
    if(usernameExists.status.localeCompare("rejected") === 0) return "A server error prevented your username from being submitted";

    if(emailExists.status.localeCompare("fulfilled") === 0) {
        if(emailExists.value != null) return "Email already exists";
    }
    if(emailExists.status.localeCompare("rejected") === 0) return "A server error prevented your email from being submitted";
    if((/\s/).test(username)) {
        return "Username cannot contain spaces"
    }
    if((/\s/).test(password)) {
        return "Password cannot contain spaces";
    }
    if(pwdChecker.exec(password) === null) {
        return "Password must contain at least one lowercase, uppercase, number, and special character";
    }
    if(password.localeCompare(matchingPassword, "en") !== 0) {
        return "Passwords must match";
    }

    // no try-catch because we want the Nextjs error handler to redirect errors to error.tsx
    let hash = await bcrypt.hash(password, 10);

    let newUser = {
        username: username,
        email: email,
        password: hash,
        favorites: [],
        history: [],
        idForResettingPwd: uuidv4()
    }

    await User.create(newUser);

    redirect("/successfulRegistration");

    // Since bcrypt.hash() and User.create() are asynchronous, any code within the callbacks of these functions will not affect the response sent back from this register() function because
    // the response is sent before the asynchronous functions could finish executing.
    // If an error occurs in bcrypt.hash() or User.create(), the client won't get a notification of the error because
    // null was sent back (if bcrypt.hash() is your last function) before those functions could reach the code that caused the error.
    // The client will receive the same, unmodified page they were on when they submitted the form, as if nothing happened.
}