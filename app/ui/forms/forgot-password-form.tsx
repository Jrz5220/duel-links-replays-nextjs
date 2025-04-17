"use client";

import { useFormState } from "react-dom";
import { resetPasswordEmail } from "@/app/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordForm() {
    const [serverMessage, formAction] = useFormState(resetPasswordEmail, undefined);

    return(
        <form action={formAction}>
            {serverMessage && <p id="loginFailMsg" className="small p-2" style={{color: "#ff0000", border: "2px solid #ff0000"}}><FontAwesomeIcon icon={faTimesCircle} className="pe-2" /> {serverMessage}</p>}
            <label htmlFor="emailRecovery" className="d-block" style={{color: "#0d6efd", fontWeight: "700"}}>Email</label>
            <input type="email" id="emailRecovery" className="d-block" name="recoveryEmail" aria-invalid={serverMessage ? "true" : "false"} aria-errormessage="loginFailMsg" required />
            <button type="submit" className="d-block btn btn-primary mt-3" name="submit">Submit</button>
        </form>
    )
}