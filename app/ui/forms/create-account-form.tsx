"use client";

import styles from "./styles/createAccountForm.module.css";
import { Button } from "../button";
import { useFormState, useFormStatus } from "react-dom";
import React from "react";
import { register } from "@/app/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function CreateAccountForm() {
    const [errorMessage, FormAction] = useFormState(register, undefined);
    return (
        <form id="registerForm" action={FormAction} className="d-flex flex-column align-items-start p-3">
            {errorMessage && <p id="serverLoginErr" className={`p-2 small ${styles.errorMessage}`}><FontAwesomeIcon icon={faCircleXmark} style={{color: "#ff0000"}} aria-hidden="true" /> {errorMessage}</p>}
            <fieldset>
                <legend className={styles.legend}>Register</legend>
                <label className={`d-flex align-items-end mb-3 ${styles.regsiterAccountLabel}`}>
                    <span className={`me-2 ${styles.inputLabel}`}>Username:</span>
                    <input type="text" id="username" name="username" maxLength={24} required />
                </label>
                <label className={`d-flex align-items-end mb-3 ${styles.regsiterAccountLabel}`}>
                    <span className={`me-2 ${styles.inputLabel}`}>Password:</span>
                    <input type="password" id="password" name="password" minLength={8} maxLength={16} required />
                </label>
                <label className={`d-flex align-items-end mb-3 ${styles.regsiterAccountLabel}`}>
                    <span className={`me-2 ${styles.inputLabel}`}>Confirm Password:</span>
                    <input type="password" id="confirm-pwd" name="confirmPwd" minLength={8} maxLength={16} required />
                </label>
                <label className={`d-flex align-items-end mb-3 ${styles.regsiterAccountLabel}`}>
                    <span className={`me-2 ${styles.inputLabel}`}>Email:</span>
                    <input type="email" id="email" name="email" maxLength={32} required />
                </label>
            </fieldset>
            <Button className="btn btn-info mt-2" type="submit" name="registerBtn">Register</Button>
        </form>
    );
}