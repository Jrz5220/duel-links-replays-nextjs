import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./dashboard-header.module.css";

export default function DashboardHeader({ username }: { username: string }) {
    return(
        <header className={`d-flex justify-content-center align-items-center justify-content-md-start px-md-4 ${styles.accountHeader} ${styles.gridItem}`}>
            <div className={`d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-start ${styles.headerContent}`}>
                <div className={`me-md-4 ${styles.accountAvatar}`}>
                    <FontAwesomeIcon icon={faCircleUser} />
                </div>
                <div className={`${styles.username}`}>
                    {username}
                </div>
            </div>
        </header>
    )
} 