import styles from "./hero.module.css";
import { audiowide } from "../fonts";
import GlowingButton from "../glowing-button/glowing-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import Script from "next/script";

export default function Hero() {
    return(
        <div className={`d-flex flex-column justify-content-center align-items-center align-items-md-start p-5 ${styles.heroContent}`}>
            <Script id="apply-glow-effect-to-hero-btn-icons">
                {`
                    // the "glowing" effect for the font awesome icons when hovering over the buttons in this hero component has to be done through JavaScript.
                    // it cannot be done through CSS because there is no way to target the GlowingButton classes through this component's CSS file.
                    // if the GlowingButton classes were within the scope of this component's CSS file then the shadow effect could be done in CSS,
                    // similar to the method used in the CSS file for the ViewDecksSection component (line 42).

                    // use variable names that are specific to the element(s) you are targeting because these Scripts are applied to the whole document,
                    // not just the component in where they are created.
                    // So instead of "glowButtons", use "heroGlowButtons" to avoid potentially redeclaring "glowButtons" in another Script.

                    const heroGlowButtons = document.getElementsByClassName("heroButton");
                    for(let i = 0; i < heroGlowButtons.length; i++) {
                        let heroGlowButton = heroGlowButtons[i];
                        heroGlowButton.addEventListener("mouseover", () => {
                            // each button should only have at most one font awesome icon
                            heroGlowButton.getElementsByClassName("buttonIcon")[0].style.filter = "drop-shadow(0 0 3px #fff)";
                        });
                        heroGlowButton.addEventListener("mouseout", () => {
                            heroGlowButton.getElementsByClassName("buttonIcon")[0].style.filter = "none";
                        });
                    }
                `}
            </Script>
            <h1 className={`mb-5 col-12 display-3 ${styles.heroTitle} ${audiowide.className}`}><span>YU-GI-OH!</span> DUEL LINKS REPLAYS</h1>
            <div className="d-flex flex-column justify-content-center flex-sm-row justify-content-md-start">
                <GlowingButton buttonLink={"https://apps.apple.com/app/id1068378177"} additionalClassNames="heroButton" >
                    <FontAwesomeIcon icon={faApple} className={`buttonIcon`} style={{fontSize: "1.1rem", marginRight: "0.5rem"}} />
                    Download
                </GlowingButton>
                <GlowingButton buttonLink={"https://play.google.com/store/apps/details?id=jp.konami.duellinks"} additionalClassNames="heroButton">
                    <FontAwesomeIcon icon={faGooglePlay} className={`buttonIcon`} style={{fontSize: "1.1rem", marginRight: "0.5rem"}} />
                    Download
                </GlowingButton>
            </div>
        </div>
    );
}