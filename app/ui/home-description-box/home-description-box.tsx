import styles from "./homeDescBox.module.css";
import { kanit } from "../fonts";

export default function HomeDescriptionBox({ children, title, mainText }: { children: React.ReactNode, title: string, mainText: string }) {
    return (
        <article className="col-md-4 text-center p-4">
            {children}
            <h2 className={kanit.className}>{title}</h2>
            <p className={styles.articleText}>{mainText}</p>
        </article>
    );
}