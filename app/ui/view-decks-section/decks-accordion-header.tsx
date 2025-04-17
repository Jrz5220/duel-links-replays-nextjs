import { audiowide } from "../fonts";
import { Button } from "../button";
import Image, { StaticImageData } from "next/image";
import styles from "./styles/decks-accordion-header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const getIndicesOfCapitalLetters = (str: string) : Array<number> => {
    let capitalLetterIndices = [];
    for(let i = 0; i < str.length; i++) {
        if(str[i] >= "A" && str[i] <= "Z") {
            capitalLetterIndices.push(i);
        }
    }
    return capitalLetterIndices;
}

export default function DecksAccordionHeader({ deckName, deckAvatarImg }: { deckName: string, deckAvatarImg: Array<StaticImageData> }) {
    const deckNameLower = deckName.toLocaleLowerCase();
    const deckNameUpper = deckName.toLocaleUpperCase();
    const collapseDeck = "collapse" + deckNameUpper[0] + deckNameLower.slice(1);
    let deckNameIsFormatted = false;
    let formattedDeckName = "";
    const capitalLettersInName = getIndicesOfCapitalLetters(deckName);
    if(capitalLettersInName.length > 0) {
        deckNameIsFormatted = true;
        let nameArray = deckNameLower.split("");
        for(let i = 0; i < capitalLettersInName.length; i++) {
            nameArray.splice(capitalLettersInName[i], 0, " ");
        }
        formattedDeckName = nameArray.join("").toLocaleUpperCase();
    }
    return (
        <h3 id={deckNameLower} className={`accordion-header ${audiowide.className}`}>
            <Button className={`accordion-button collapsed p-4 ${styles.deckButton} ${styles.showContent}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseDeck}`} aria-expanded="false" aria-controls={collapseDeck}>
                <div className={styles.deckButtonImage}>
                    <Image src={deckAvatarImg[0]} alt="Revendread Executor" style={{width: "100%"}} />
                </div>
                {
                    deckNameIsFormatted ? <p className="m-0">{formattedDeckName}</p> : <p className="m-0">{deckNameUpper}</p>
                }
                <FontAwesomeIcon icon={faChevronDown} className={`deck-list-arrow ${styles.deckButtonArrowSVG}`} />
            </Button>
        </h3>
    )
}