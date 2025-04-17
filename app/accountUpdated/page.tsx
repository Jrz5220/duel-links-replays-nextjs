import styles from "./page.module.css";
import BigLoginForm from "../ui/forms/big-login-form";

export default function AccountUpdated() {

    return(
        <div className={`position-relative ${styles.container}`}>
            <h2 className="pb-3">Successfully Updated Your Account</h2>
            <p>Please sign in again to view your changes.</p>
            <div className={styles.loginFormContainer}>
                <BigLoginForm />
            </div>
        </div>
    )
}