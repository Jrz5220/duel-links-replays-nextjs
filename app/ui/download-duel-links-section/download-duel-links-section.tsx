import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultBackgroundPattern from "../bg-pattern/default-background-pattern"
import styles from "./download-duel-links-section.module.css"
import GlowingButton from "../glowing-button/glowing-button"
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";


export default function DownloadDuelLinksSection() {
    return(
        <section className={`text-center p-5 ${styles.bgDesign}`}>
            <DefaultBackgroundPattern numOfRows={2} />
            <h2 className={`display-5 mb-4 ${styles.topElement}`}>Download Yu-Gi-Oh! Duel Links</h2>
            <div className={`d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-center ${styles.topElement}`}>
                <GlowingButton buttonLink="https://apps.apple.com/app/id1068378177">
                    <FontAwesomeIcon icon={faApple} className={`buttonIcon`} style={{fontSize: "1.1rem", marginRight: "0.5rem"}} />
                    Download
                </GlowingButton>
                <GlowingButton buttonLink={"https://play.google.com/store/apps/details?id=jp.konami.duellinks"} additionalClassNames="heroButton">
                    <FontAwesomeIcon icon={faGooglePlay} className={`buttonIcon`} style={{fontSize: "1.1rem", marginRight: "0.5rem"}} />
                    Download
                </GlowingButton>
            </div>
        </section>
    )
}