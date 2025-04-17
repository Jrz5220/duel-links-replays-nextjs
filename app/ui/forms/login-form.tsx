"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { Button } from "../button";
import Link from "next/link";
import styles from "./styles/loginForm.module.css";

function LoginButton() {
    const { pending } = useFormStatus();
    return(
        <Button className="btn btn-primary" type="submit" name="button" aria-disabled={pending}>
            {pending ? "Submitting..." : "Sign In"}
        </Button>
    );
}

export default function LoginForm() {
    // Error states useFormState should be updated to useActionState, but the version of React that comes with NextJS does not recognize useActionState as a function
    // This is b/c the version of React that comes with Nextjs still uses useFormState, but Nextjs still wants you to use useActionState.
    // You have to wait for a future release of Nextjs that comes with React 19.
    // Or you could try running 'npm i @types/react@18.3.3'
    // Either way, this error does not affect the performance of the website.
    const [errorMessage, loginAction] = useFormState(authenticate, undefined);
    return(
        <form id="loginForm" action={loginAction} className={`card card-body bg-light ${styles.loginForm}`}>
            {errorMessage && <p id="serverLoginErr" className="small" style={{color: "#aa0000"}}>{errorMessage}</p>}
            {/* loginWarning alerts users to sign in if they try to perform actions that require a logged in user */}
            <div id="loginWarning" className="small" role="alert" aria-atomic="true" style={{color: "#aa0000"}}></div>
            <fieldset>
                <label htmlFor="username" className="d-block">Username</label>
                <input type="text" id="username" className="d-block mb-3" name="username" required />
                <label htmlFor="password" className="d-block">Password</label>
                <input type="password" id="password" className="d-block mb-1" name="password" required />
            </fieldset>
            <div className="mb-3">
                <Link href={"/forgotPassword"} className={`text-primary ${styles.forgotPwdLink}`}>Forgot password?</Link>
            </div>
            <LoginButton />
        </form>
    );
}