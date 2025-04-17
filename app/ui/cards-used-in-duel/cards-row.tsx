import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faDragon, faMeteor, faShieldHalved, faStar } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { IYugiohCard } from "@/app/models/duel";
import styles from "./styles/cards-row.module.css";
import EnlargeCardOnClickScript from "./enlarge-card-on-click-script";

const displayMonsterProps = (card: IYugiohCard) => {
    return(
        <div className={styles.cardAttributes}>
            <div className={`position-relative mb-3 ${styles.topElement}`}>
                <span>
                    <FontAwesomeIcon icon={faStar} className={styles.cardPropIcon} />
                    <span className="fw-bold">Level: </span>
                </span>
                {card.level}
            </div>
            <div className={`position-relative mb-3 ${styles.topElement}`}>
                <span>
                    <FontAwesomeIcon icon={faBookmark} className={styles.cardPropIcon} />
                    <span className="fw-bold">Attribute: </span>
                </span>
                {card.attribute}
            </div>
            <div className={`position-relative mb-3 ${styles.topElement}`}>
                <span>
                    <FontAwesomeIcon icon={faDragon} className={styles.cardPropIcon} />
                    <span className="fw-bold">Type: </span>
                </span>
                {card.type}
            </div>
        </div>
    )
}

const displayMonsterSummonReq = (card: IYugiohCard) => {
    return(
        <div className={`pb-1 ${styles.summonReq}`}>
            {card.summonRequirement}
        </div>
    )
}

const displayMonsterStats = (card: IYugiohCard) => {
    return(
        <div className={`position-relative d-flex justify-content-between justify-content-sm-around ${styles.topElement} ${styles.cardAttributes}`}>
            <div>
                <FontAwesomeIcon icon={faMeteor} className={styles.cardPropIcon} />
                <span className="fw-bold">ATK: </span>
                {card.atk}
            </div>
            <div>
                <FontAwesomeIcon icon={faShieldHalved} className={styles.cardPropIcon} />
                <span className="fw-bold">DEF: </span>
                {card.def}
            </div>
        </div>
    )
}

const displaySpellTrapProps = (card: IYugiohCard) => {
    return(
        <div className={`position-relative mb-3 ${styles.topElement} ${styles.cardAttributes}`}>
            <span>
                <FontAwesomeIcon icon={faBookmark} className={styles.cardPropIcon} />
                <span className="fw-bold">Type: </span>
            </span>
            {card.type}
        </div>
    )
}

export default function CardsRow({ cards }: { cards: Array<IYugiohCard> }) {
    return(
        <div id="cardsUsedRow" className={`row position-relative`}>
            <EnlargeCardOnClickScript />
            {/* display all cards in the cards array */}
            {
                cards.map((card, index) => {
                    return(
                        <div key={index} className="col-6 col-sm-4 col-lg-3 col-xl-2 mb-5">
                            <div className={styles.cardWrapper}>
                                <div id={card.htmlId} className={`yugiohCard ${styles.yugiohCard} ${styles.clickable}`}>
                                    <div className={`d-block ${styles.cardImageWrapper} ${card.type}`}>
                                        {/* if you are using statically imported images (local images) you do not need to specify the width or height props of the Image component */}
                                        {/* if using remote images, then the width and height props are required for the Image component */}
                                        {/* https://nextjs.org/docs/app/api-reference/components/image#required-props */}
                                        <Image className={`d-block mx-auto ${styles.cardImage}`} src={`/images/cards/${card.imgDir}/${card.htmlId}.jpg`} width={421} height={614} alt={card.name} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {/* enlarge card when one of the above cards is clicked */}
            {
                cards.map((card, index) => {
                    return(
                        <div key={index} id={`expanded-${card.htmlId}-card`} className={`container pt-2 pt-md-4 pb-4 ps-4 pe-4 ${styles.expandedCardContainer} ${styles.hideExpandedCard}`}>
                            <div className="position-relative d-flex justify-content-end mb-2 mb-md-0">
                                <button id={`close-${card.htmlId}-card`} className={`me-md-5 ${styles.closeExpanedCardBtn}`} type="button">
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <div className={`d-block position-relative mb-3 ${styles.topElement}`}>
                                        <Image className={`d-block mx-auto ${styles.expandedCardImage}`} src={`/images/cards/${card.imgDir}/${card.htmlId}.jpg`} width={421} height={614} alt={card.name} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <h3 className={`position-relative mb-3 ${styles.topElement} ${styles.cardName}`}>{card.name}</h3>
                                    { card.level !== null ? displayMonsterProps(card) : displaySpellTrapProps(card) }
                                    <div className={`position-relative p-2 mb-3 ${styles.topElement} ${styles.cardTextbox}`}>
                                        {/* boolean expression */}
                                        {/* if both operands are true, the last operand is returned.
                                            if only one operand is true, false is returned. */}
                                        { card.summonRequirement !== null && displayMonsterSummonReq(card) }
                                        <p className="mb-0">{card.effect}</p>
                                    </div>
                                    { card.atk !== null && displayMonsterStats(card) }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}