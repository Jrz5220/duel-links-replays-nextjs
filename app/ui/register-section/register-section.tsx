import styles from "./register-section.module.css";
import CreateAccountForm from "../forms/create-account-form";

export default function RegisterSection() {
    return(
        <main className={`d-flex justify-content-center align-items-center position-relative ${styles.registerSection}`}>
            <div className={`d-flex flex-column flex-md-row justify-content-center align-items-center ${styles.registerContentWrap}`}>
                <article className={`align-self-stretch p-5 ${styles.benefits}`}>
                    <h1 className="mb-4">Create An Account</h1>
                    <p className="d-flex justify-content-start align-items-center mb-4"><i className="fas fa-thumbs-up"></i> Like videos!</p>
                    <p className="d-flex justify-content-start align-items-center mb-4"><i className="fas fa-star"></i> Save your Favorite Duels!</p>
                    <p className="d-flex justify-content-start align-items-center"><i className="fas fa-paper-plane"></i> Get notified when new duels are uploaded!</p>
                </article>
                <div className={`align-self-stretch p-3 ${styles.registerFormWrap}`}>
                    <CreateAccountForm />
                </div>
            </div>
        </main>
    );
}