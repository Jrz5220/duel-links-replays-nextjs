import styles from "./styles/patternRow.module.css";
import rowStyles from "./styles/patternRow.module.css";
import PatternRow from "./pattern-row";

export default function CreateAccountPagePattern() {
    let additionalStyles = {
        top: "unset",
        bottom: "-5rem"
    }
    let firstRowStyle = {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.05) 100%)",
        borderTop: "none",
        borderLeft: "none"
    }
    return(
        <div className={styles.bgPatternContainer} aria-hidden="true" style={additionalStyles}>
            <div className={rowStyles.bgPatternRow}>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
                <div className={rowStyles.squarePattern} style={firstRowStyle}></div>
            </div>
            <PatternRow />
        </div>
    );
}