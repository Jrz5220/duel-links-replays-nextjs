import styles from "./cards-used-in-duel.module.css";
import CardsRow from "./cards-row";
import Image from "next/image";
import { IYugiohCard } from "@/app/models/duel";
import { IDuelSkillData } from "@/app/duel-video/[duelname]/page";
import DefaultCardImage from "../../../public/images/cards/default.jpg";

const displaySkillCard = (cardDetails: IDuelSkillData) => {
    return(
        <div className="d-flex justify-content-center justify-content-md-start flex-wrap flex-md-nowrap mt-4">
            <div className={styles.skillCardContainer}>
                <Image src={cardDetails.skillCardPath == null ? DefaultCardImage : cardDetails.skillCardPath} className={styles.skillCardImage} alt={cardDetails.skillCardName == null ? "Yu-Gi-Oh Card" : cardDetails.skillCardName} width={421} height={614} />
            </div>
            <div className={`p-3`}>
                <p>{cardDetails.skillCardName}</p>
                <p>{cardDetails.skillCardType}</p>
                <p>{cardDetails.skillCardEffect}</p>
            </div>
        </div>
    )
}

export default function CardsUsedInDuelSection({ cards, skill }: { cards: Array<IYugiohCard>, skill: IDuelSkillData }) {
    return(
        <section id="cardsUsedInDuel" className={`container-fluid p-5 ${styles.mainSection}`}>
            <h2 className={`text-center mb-5${styles.cardsUsedHeader}`}>Cards Used In Duel</h2>
            <div id="cardsUsedContainer" className={`container position-relative`}>
                <CardsRow cards={cards} />
                <button type="button" className={`btn btn-dark btn-lg`} data-bs-toggle="collapse" data-bs-target="#skill" aria-expanded="false" aria-controls="skill">
                    Skill: {skill.skill}
                </button>
                <div id="skill" className={`collapse ${styles.skillBoxCollapsed}`}>
                    <div className={`container-fluid p-4 mt-3 ${styles.skillContainer}`}>
                        <p className={`p-3 mb-0 ${styles.skillDetails}`}>
                            {skill.skillDetail}
                        </p>
                        { skill.containsSkillCard && displaySkillCard(skill) }
                    </div>
                </div>
            </div>
        </section>
    )
}