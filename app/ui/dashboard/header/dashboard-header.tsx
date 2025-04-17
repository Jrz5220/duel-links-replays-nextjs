import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./dashboard-header.module.css";
import { faTwitch, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function DashboardHeader({ username }: { username: string }) {
    return(
        <header className={`d-flex justify-content-center align-items-center justify-content-md-start px-md-4 ${styles.accountHeader} ${styles.gridItem}`}>
            <div className={`d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-start ${styles.headerContent}`}>
                <div className={`me-md-4 ${styles.accountAvatar}`}>
                    <FontAwesomeIcon icon={faCircleUser} />
                </div>
                <div className={`d-md-flex flex-column align-items-md-start ${styles.username}`}>
                    {username}
                    <div className={`d-flex justify-content-between align-items-center mt-2 ${styles.socialMediaIcons}`}>
                        <FontAwesomeIcon icon={faTwitch} className={styles.brandIcon} />
                        <FontAwesomeIcon icon={faInstagram} className={styles.brandIcon} />
                        <FontAwesomeIcon icon={faXTwitter} className={styles.brandIcon} />
                        <FontAwesomeIcon icon={faYoutube} className={styles.brandIcon} />
                    </div>
                </div>
            </div>
        </header>
    )
} 