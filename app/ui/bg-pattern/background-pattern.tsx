import styles from "./bgPattern.module.css";

export default function BackgroundPattern() {
    return(
        <div className={styles.bgPatternContainer} aria-hidden="true">
            <div className={styles.bgPatternRow}>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
            </div>
            <div className={styles.bgPatternRow}>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
                <div className={styles.squarePattern}></div>
            </div>
        </div>
    );
}