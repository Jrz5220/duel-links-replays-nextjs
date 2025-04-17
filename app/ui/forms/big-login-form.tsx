"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../../lib/actions";
import { Button } from "../../ui/button";
import styles from "../../ui/forms/styles/createAccountForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function LoginButton() {
    const { pending } = useFormStatus();
    return(
        <Button className="btn btn-primary" type="submit" name="button" aria-disabled={pending}>
            {pending ? "Submitting..." : "Sign In"}
        </Button>
    );
}

export default function BigLoginForm() {
    const [errorMessage, loginAction] = useFormState(authenticate, undefined);

    return(
        <form action={loginAction} className="d-flex flex-column align-items-start p-3">
            {errorMessage && <p id="serverLoginErr" className="small p-2" style={{color: "#fff", border: "2px solid #ff0000"}}><FontAwesomeIcon icon={faCircleXmark} style={{color: "#ff0000"}} aria-hidden="true" /> {errorMessage}</p>}
            <fieldset>
                <legend className={styles.legend}>Sign In</legend>
                <label className={`d-flex align-items-end mb-3 ${styles.regsiterAccountLabel}`}>
                    <span className={`me-2 ${styles.inputLabel}`}>Username:</span>
                    <input type="text" id="username" name="username" maxLength={24} required />
                </label>
                <label className={`d-flex align-items-end mb-3 ${styles.regsiterAccountLabel}`}>
                    <span className={`me-2 ${styles.inputLabel}`}>Password:</span>
                    <input type="password" id="password" name="password" minLength={8} maxLength={16} required />
                </label>
            </fieldset>
            <LoginButton />
        </form>
    )
}