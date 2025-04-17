import styles from "./register-section.module.css";
import CreateAccountForm from "../forms/create-account-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function RegisterSection() {
    return(
        <main className={`d-flex justify-content-center align-items-center position-relative ${styles.registerSection}`}>
            <div className={`d-flex flex-column flex-md-row justify-content-center align-items-center ${styles.registerContentWrap}`}>
                <article className={`align-self-stretch p-5 ${styles.accountBenefits}`}>
                    <h1 className="mb-4">Create An Account</h1>
                    <p className="d-flex justify-content-start align-items-center mb-4"><FontAwesomeIcon icon={faThumbsUp} className={styles.faIcon} /> Like videos!</p>
                    <p className="d-flex justify-content-start align-items-center mb-4"><FontAwesomeIcon icon={faStar} className={styles.faIcon} /> Save your Favorite Duels!</p>
                    <p className="d-flex justify-content-start align-items-center"><FontAwesomeIcon icon={faPaperPlane} className={styles.faIcon} /> Get notified when new duels are uploaded!</p>
                </article>
                <div className={`align-self-stretch p-3 ${styles.registerFormWrap}`}>
                    <CreateAccountForm />
                </div>
            </div>
        </main>
    );
}