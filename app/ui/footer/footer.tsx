import Link from "next/link";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faSteam } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer className={`p-5 ${styles.footer}`}>
            <div className={`container ${styles.setWidth}`}>
                <div className={`d-flex justify-content-evenly ${styles.footerLinks}`}>
                    <Link href="https://store.steampowered.com/app/601510/YuGiOh_Duel_Links/" className={styles.footerLink} target="_blank">
                        <FontAwesomeIcon icon={faSteam} className="fs-4" />
                    </Link>
                    <Link href="https://jrz5220.github.io/felixlazo/contact.html" className={styles.footerLink} target="_blank">
                        <FontAwesomeIcon icon={faEnvelope} className="fs-4" />
                    </Link>
                    <Link href="https://github.com/" className={styles.footerLink} target="_blank">
                        <FontAwesomeIcon icon={faGithub} className="fs-4" />
                    </Link>
                </div>
                <p className={`mt-4 mb-0 ${styles.disclaimer}`}>
                    <small>
                        This website is not affiliated with the Konami Corporation.
                        All information related to the Yu-Gi-Oh! trading card game and Yu-Gi-Oh! Duel Links is owned and copyrighted by Konami.
                    </small>
                </p>
            </div>
        </footer>
    )
}