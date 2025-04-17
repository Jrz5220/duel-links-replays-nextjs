import Link from "next/link";
import styles from './error-page.module.css';

export default function ErrorBody({ errorMsg }: { errorMsg: string }) {
    return (
        <section className={styles.errorBody}>
            <p className={styles.errorMsg}>{errorMsg}</p>
            <p className={`pb-3 ${styles.errorMsg}`}>For further assistance, you can email me at felixlazo.web@gmail.com</p>
            <Link href="/" className={`btn btn-warning ${styles.homeBtn}`}>Go back to home</Link>
        </section>
    );
}