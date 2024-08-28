import styles from "./homeDescBox.module.css";
import { kanit } from "../fonts";

export default function HomeDescriptionBox({ fontAwesomeIconClass, title, mainText }: { fontAwesomeIconClass: string, title: string, mainText: string }) {
    return (
        <article className="col-md-4 text-center p-4">
            <i className={`mb-3 ${fontAwesomeIconClass} ${styles.articleIcon}`} aria-hidden="true"></i>
            <h2 className={kanit.className}>{title}</h2>
            <p className={styles.articleText}>{mainText}</p>
        </article>
    );
}