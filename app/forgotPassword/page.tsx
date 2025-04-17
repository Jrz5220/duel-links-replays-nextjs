import ForgotPasswordForm from "../ui/forms/forgot-password-form";
import Navbar from "../ui/navbar/navbar";
import styles from "./page.module.css";

export default function ForgotPassword() {
    return(
        <>
            <Navbar />
            <header>
                <h1 className="text-center my-4 my-md-5">Reset Password</h1>
            </header>
            <section>
                <article className={`mx-width-800 p-2 p-md-0 ${styles.formContainer}`}>
                    <p>Enter the email associated with your account. You will receive an email with steps on how to reset your password.</p>
                    <ForgotPasswordForm />
                </article>
            </section>
        </>
    )
}