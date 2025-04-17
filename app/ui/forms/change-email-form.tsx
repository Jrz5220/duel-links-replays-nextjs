"use client";

import { useFormState } from "react-dom";
import { changeEmail } from "@/app/lib/actions";
import styles from "./styles/change-email-form.module.css";

export default function ChangeEmailForm({ username, currentEmail }: { username: string, currentEmail: string }) {
    const [errorMessage, formAction] = useFormState(changeEmail, undefined);

    return(
        <form id="changeEmailForm" action={formAction}>
            <input type="hidden" name="username" value={username} />
            <input type="hidden" name="currentEmail" value={currentEmail} />
            {errorMessage && <p className="p-1" role="alert" style={{border: "2px solid #aa0000", borderRadius: "4px", color: "#aa0000", maxWidth: "16rem"}}>{errorMessage}</p>}
            <fieldset>
                <legend className="h3 mb-3">Change Email</legend>
                <label htmlFor="newEmail" className="d-block">New Email:</label>
                <input type="email" id="newEmail" className={`d-block mb-4 ${styles.formInput}`} name="newEmail" required />
            </fieldset>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    )
}