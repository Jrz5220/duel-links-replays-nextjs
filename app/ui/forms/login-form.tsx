"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { Button } from "../button";
import Link from "next/link";
import styles from "./styles/loginForm.module.css";

export default function LoginForm() {
    const [errorMessage, loginAction] = useFormState(authenticate, undefined);
    return(
        <form id="loginForm" action={loginAction} className={`card card-body bg-light ${styles.loginForm}`}>
            {errorMessage && <p id="serverLoginErr" className="small" style={{color: "#aa0000"}}>{errorMessage}</p>}
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

function LoginButton() {
    const { pending } = useFormStatus();
    return(
        <Button className="btn btn-primary" type="submit" name="button" aria-disabled={pending}>
            {pending ? "Submitting..." : "Sign In"}
        </Button>
    );
}