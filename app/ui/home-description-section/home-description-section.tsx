import HomeDescriptionBox from "../home-description-box/home-description-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCrown, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./homeDescSection.module.css";

export default function HomeDescriptionSection() {
    return(
        <section className="container-fluid p-4">
            <div className="row">
                <HomeDescriptionBox
                    title="Duel Replays"
                    mainText="Watch some of my favorite duel links replay videos"
                >
                    <FontAwesomeIcon icon={faCirclePlay} className={`mb-3 ${styles.fontAwesomeIcon}`} aria-hidden="true" />        
                </HomeDescriptionBox>
                <HomeDescriptionBox
                    title="King of Games"
                    mainText="King of Games Duelist and KC Cup competitor"
                >
                    <FontAwesomeIcon icon={faCrown} className={`mb-3 ${styles.fontAwesomeIcon}`} aria-hidden="true" />
                </HomeDescriptionBox>
                <HomeDescriptionBox
                    title="Popular Cards"
                    mainText="View popular cards used in the duel replays"
                >
                    <FontAwesomeIcon icon={faHeart} className={`mb-3 ${styles.fontAwesomeIcon}`} aria-hidden="true" />
                </HomeDescriptionBox>
            </div>
        </section>
    );
}