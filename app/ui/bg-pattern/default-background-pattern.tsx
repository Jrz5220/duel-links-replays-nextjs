import PatternRow from "./pattern-row";
import styles from './defaultBackgroundPattern.module.css';

export default function DefaultBackgroundPattern({ numOfRows }: { numOfRows: number }) {
    const bgPatternRows = [];
    for(let i=0; i < numOfRows; i++) {
        bgPatternRows.push(<PatternRow key={i} />);
    }
    return (
        <div className={styles.bgPatternContainer} aria-hidden="true">
            {bgPatternRows}
        </div>
    );
}