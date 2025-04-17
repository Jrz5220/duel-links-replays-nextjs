import styles from "./patternRow.module.css";

export default function PatternRow() {
    return(
        <div className={styles.bgPatternRow} >
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
    );
}