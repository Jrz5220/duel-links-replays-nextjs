'use server';

// connect the auth sign-in logic with your login form
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import User from '../models/user';
import { v4 as uuidv4 } from "uuid";
import { permanentRedirect, redirect } from 'next/navigation';
import auth from "../../middleware";
import { signOut } from "@/auth";
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from "zod";
// check values inside cookies for practice (not needed)
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#cookies
import { cookies } from 'next/headers';
import { hash } from 'bcrypt';

// Server actions recieve the FormData property automatically.
// the component invoking a server action does not need to explicity pass the form data as a prop.
export async function deleteVideos(username: string, field: "favorites" | "history", formData: FormData) {
    const rawFormData = {
        deleteVideos: formData.getAll("videoToDelete"), // all duelNames of videos to delete
    }
    const deleteVideos: Array<string> = [];
    rawFormData.deleteVideos.forEach((video: any) => {
        deleteVideos.push(video);
    });
    // You should authenticate users in server actions because
    // server actions are treated as public HTTP endpoints,
    // allowing anyone to access the endpoint.
    // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#authentication-and-authorization
        const verifiedUser = await verifyUser(username);
        if(verifiedUser) {
            const user = await User.findOne({ username: username }, "favorites history").exec();
            if(field === "favorites") {
                let favorites = user.favorites;
                for(let i = 0; i < favorites.length; i++) {
                    if(favorites[i].duelName === deleteVideos[i]) {
                        favorites.splice(i, 1);
                    }
                }
                await user.updateOne({ favorites: favorites });
            }
            if(field === "history") {
                let history = user.history;
                for(let i = 0; i < history.length; i++) {
                    for(let j = 0; j < deleteVideos.length; j++) {
                        if(history[i].duelName === deleteVideos[j]) {
                            history.splice(i, 1);
                        }
                    }
                }
                await user.updateOne({ history: history });
            }
        } else {
            throw new Error("Failed to verify logged in user. Please sign out and try again.");
        }

    // If the server action is never used in your app,
    // next.js removes the action from the build for security reasons.

    // If it is used, next.js creates a secure ID to allow the client
    // to reference and call the server action.
    // This ID gets created during compilation and gets cached for 14 days.
    // A new ID is regenerated after a new build is initiated or when the build cache is invalidated.
    // This means actions can only be invoked for a specific build.

    // Server actions only use the POST method, preventing most CSRF attacks.
    // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#allowed-origins-advanced

    revalidatePath("/dashboard/" + username);   // revalidates the browser cache, updating the UI
}

const verifyUser = async (username: string): Promise<boolean> => {
    const session = await auth();
    if(session && session.user) {
        let sessionUser = await User.findOne({email: session.user.email}, "username").exec();
        if(sessionUser.username === username) { return true; }
    }
    return false;
}

export async function resetPasswordEmail(prevState: string | undefined, formData: FormData) {
    const rawFormData = {
        userEmail: formData.get("recoveryEmail")
    }
    const user = await User.findOne({email: rawFormData.userEmail?.toString()}, "email").exec();
    if(user) {
        // send an email to reset password (nodemailer)
        return "Email is valid but the function to send emails has not been implemented yet";
    }
    return "That email does not exist in our database";
}

export async function changeEmail(prevState: string | undefined, formData: FormData) {
    const rawFormData = {
        oldEmail: formData.get("currentEmail"),
        newEmail: formData.get("newEmail"),
        username: formData.get("username")
    }
    if(rawFormData.username) {
        const verifiedUser = await verifyUser(rawFormData.username.toString());
        if(verifiedUser) {
            let username = rawFormData.username.toString();
            if(rawFormData.oldEmail && rawFormData.newEmail) {
                let oldEmail = rawFormData.oldEmail;
                let newEmail = rawFormData.newEmail;
                const emailSchema = z.string().email();
                try {
                    // check if email is in valid format
                    emailSchema.parse(newEmail);
                } catch(err: any) {
                    return "Invalid email";
                }
                // check if valid email is duplicate
                let duplicateEmail = await User.exists({ email: newEmail });
                if(duplicateEmail) {
                    return "This email already exists";
                }
                let user = await User.findOne({ username: username }, "email").exec();
                await user.updateOne({ email: newEmail });
                await signOut({ redirectTo: "/accountUpdated", redirect: true });
            }
            throw new Error("Your email is missing from your submitted form. Please sign out and try again.");
        }
        throw new Error("The username associated with your account could not be verified. Please sign out and try again.");
    }
    throw new Error("Your username could not be identified. Please sign out and try again.");
}

export async function changePassword(prevState: string | undefined, formData: FormData) {
    const rawFormData = {
        oldPwd: formData.get("currentPwd"),
        newPwd: formData.get("newPwd"),
        confirmNewPwd: formData.get("confirmNewPwd"),
        username: formData.get("username")
    }
    const bcrypt = require("bcrypt");
    if(rawFormData.username) {
        let username = rawFormData.username.toString();
        const verifiedUser = await verifyUser(username);
        if(verifiedUser) {
            const user = await User.findOne({ username: username }, "password").exec();
            let pwdResult = await bcrypt.compare(rawFormData.oldPwd, user.password);
            if(pwdResult) {
                if(rawFormData.newPwd && rawFormData.confirmNewPwd) {
                    let newPwd = rawFormData.newPwd.toString();
                    let confirmNewPwd = rawFormData.confirmNewPwd.toString();
                    const pwdChecker = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/);
                    if(newPwd.length < 8 || newPwd.length > 16) {
                        return "Password must be between 8 and 16 characters long";
                    }
                    if((/\s/).test(newPwd)) {
                        return "Password cannot contain spaces";
                    }
                    if(pwdChecker.exec(newPwd) === null) {
                        return "Password must contain at least one lowercase, uppercase, number, and special character";
                    }
                    if(newPwd.localeCompare(confirmNewPwd, "en") !== 0) {
                        return "Passwords must match";
                    }
                    // update password after checks are complete
                    try {
                        let hash = await bcrypt.hash(newPwd);
                        await user.UpdateOne({ password: hash });
                        return "Successfully updated password";
                    } catch(err: any) {
                        throw new Error("A server error prevented your password from being updated. Please sign out and try again.");
                    }
                }
                return "Please provide a new password";
            }
            return "Current password is incorrect";
        }
        throw new Error("Failed to verify logged in user. Please sign out and try again.");
    } 
    throw new Error("Your submitted form is missing a username. Please sign out and try again.");
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        console.log("authenticate form data: " + JSON.stringify(formData));
        let authenticatedUser = await signIn('credentials', formData);
        console.log("authenticated user: " + JSON.stringify(authenticatedUser));
      } catch (error) {
            // NextAuth.js errors: https://authjs.dev/reference/core/errors/
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        return 'Invalid credentials';
                    default:
                        return 'Something went wrong. Please try again.';
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