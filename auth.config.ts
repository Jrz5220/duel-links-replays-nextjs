// Use the Auth.js config object to set the custom authentication logic compatible for this framework.
// Since Auth.js is a library that integrates with many JavaScript frameworks, we have to
// pass in all the options specific to this framework's initialization function.
// Then we can export the route handler(s), signin and signout methods, and more.
// https://authjs.dev/getting-started/installation?framework=next.js

import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
    pages: {
        signIn: '/',
        signOut: '/',
    },
    callbacks: {
        // callback used to verify if the request is authorized to access a page. It is called before a request is completed.
        // The 'auth' property contains the user's session, and the 'request' property contains the incoming request.
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // prevent users from accessing the dashboard pages unless they are logged in
            if(isOnDashboard) {
                if(isLoggedIn) return true;
                return false;       // Redirect unauthenticated users to login page
            } else if(isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],  // Add providers (providers are added in auth.ts. you need to specify here just to satisfiy the NextAuthConfig)
} satisfies NextAuthConfig;