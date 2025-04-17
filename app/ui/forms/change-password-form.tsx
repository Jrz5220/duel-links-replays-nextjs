"use client";

import styles from "./styles/change-password-form.module.css";
import { changePassword } from "@/app/lib/actions"
import { useFormState } from "react-dom";   // useActionState is still not being recognized

export default function ChangePasswordForm({ username }: { username: string }) {
    // const changePwdWithUsername = changePassword.bind(null, username);
    const [errorMessage, formAction] = useFormState(changePassword, undefined);

    return(
        <form id="changePasswordForm" action={formAction}>
            {errorMessage && <p className="passwordWarning" role="alert" style={ {color: "#aa0000", maxWidth: "16rem"} }>{errorMessage}</p>}
            <fieldset>
                <input type="hidden" name="username" value={username} />
                <legend className="h3 mb-3">Change Password</legend>
                <label htmlFor="currentPwd" className="d-block">Current Password: </label>
                <input type="password" id="currentPwd" className={`d-block mb-4 ${styles.formInput}`} name="currentPwd" required />
                <label htmlFor="newPwd" className="d-block">New Password: </label>
                <input type="password" id="newPwd" className={`d-block mb-4 ${styles.formInput}`} name="newPwd" minLength={8} maxLength={16} required />
                <label htmlFor="confirmNewPwd" className="d-block">Confirm New Password: </label>
                <input type="password" id="confirmNewPwd" className={`d-block mb-4 ${styles.formInput}`} name="confirmNewPwd" minLength={8} maxLength={16} required />
            </fieldset>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    )
}