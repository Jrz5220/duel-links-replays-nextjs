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
        signOut: '/dashboard',  // you can only sign out on the dashboard page
    },
    callbacks: {
        // This callback is always checked first by every request, regardless of the destination route.
        // callback used to verify if the request is authorized to access a page. It is called before a request is completed.
        // The 'auth' property contains the user's session, and the 'request' property contains the incoming request.
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;    // !! forces a boolean to be returned? https://stackoverflow.com/questions/5629684/how-can-i-check-if-an-element-exists-in-the-visible-dom#answers-header
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnAccountUpdatedPage = nextUrl.pathname.startsWith("/accountUpdated");
            // prevent users from accessing the dashboard pages unless they are logged in
            if(isOnDashboard) {
                if(isLoggedIn) {
                    // only the email field is associated with auth.user
                    return true;
                }
                return false;       // Redirect unauthenticated users to sign in page (the home page in this case)
            } else if(isLoggedIn) {
                if(isOnAccountUpdatedPage) {
                    return Response.redirect(new URL('/', nextUrl));    // 'nextUrl' is required in 'new URL()' for it to work
                }
                // return Response.redirect(new URL('/dashboard', nextUrl)); will cause a redirect to dashboard everytime the user is logged in,
                // which is not what we want since the user should be able to visit other pages when logged in.
                // we don't need to redirect to anywhere if they are logged in
            }
            return true;
        },
    },
    providers: [],  // Add providers (providers are added in auth.ts. you need to specify here just to satisfiy the NextAuthConfig)
} satisfies NextAuthConfig;