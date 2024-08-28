import styles from "./hero.module.css";
import { audiowide } from "../fonts";
import GlowingButton from "../glowing-button/glowing-button";

export default function Hero() {
    return(
        <div className={`d-flex flex-column justify-content-center align-items-center align-items-md-start p-5 ${styles.heroContent}`}>
            <h1 className={`mb-5 col-12 display-3 ${styles.heroTitle} ${audiowide.className}`}><span>YU-GI-OH!</span> DUEL LINKS REPLAYS</h1>
            <div className="d-flex flex-column justify-content-center flex-sm-row justify-content-md-start">
                <GlowingButton buttonLink={"https://apps.apple.com/app/id1068378177"}><i className="fab fa-apple"></i> Download</GlowingButton>
                <GlowingButton buttonLink={"https://play.google.com/store/apps/details?id=jp.konami.duellinks"}><i className="fab fa-google-play"></i> Download</GlowingButton>
            </div>
        </div>
    );
}