import { videoLinkData } from "@/app/lib/HomePageDuelImages";
import DeckDuel from "./deck-duel";

export default function DecksAccordionBody({ deckName, duelVideosForDeck }: { deckName: string, duelVideosForDeck: Array<videoLinkData> }) {
    const deckNameLower = deckName.toLocaleLowerCase();
    const deckNameUpper = deckName.toLocaleUpperCase();
    const collapseDeck = "collapse" + deckNameUpper[0] + deckNameLower.slice(1);

    return(
        <div id={collapseDeck} className="accordion-collapse collapse mt-3" aria-labelledby={deckNameLower} data-bs-parent="#decksAccordion">
            <div className="accordion-body">
                <div className="container-fluid">
                    <div className="row gy-2 gx-3 d-flex justify-content-center align-items-center">
                        {duelVideosForDeck.map((video, index) => {
                            return (
                                <DeckDuel index={index} duelVideo={video} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
