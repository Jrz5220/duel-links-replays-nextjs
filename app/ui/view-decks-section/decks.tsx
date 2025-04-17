"use client";

import Image, { StaticImageData } from "next/image";
import { videoLinkData } from "@/app/lib/HomePageDuelImages";
import Script from "next/script";
import DecksAccordionBody from "./decks-accordion-body";
import DecksAccordionHeader from "./decks-accordion-header";

export default function DeckItem({ deckName, deckAvatarImg, duelVideosForDeck }: { deckName: string, deckAvatarImg: Array<StaticImageData>, duelVideosForDeck: Array<videoLinkData> }) {
    const invalidName = /[\W_]/;
    if(invalidName.test(deckName)) {
        throw new Error("deckName can not contain any spaces, underscores, or special characters.");
    }

    return(
        <div className="accordion-item mb-3">
            <Script
            id="flipArrowEffect"
            onReady={() => {
                let accordionButtons = document.getElementsByClassName("accordion-button");
                let arrowIcons = document.getElementsByClassName("deck-list-arrow");
                for(let i = 0; i < accordionButtons.length; i++) {
                    let deckButton = accordionButtons[i] as HTMLElement;
                    deckButton.addEventListener("click", () => {
                        // find any button that has aria-expanded false and flip those arrows 0deg
                        for(let j = 0; j < accordionButtons.length; j++) {
                            if(accordionButtons[j].getAttribute("aria-expanded") === "false") {
                                let theArrow = arrowIcons[j] as HTMLElement;
                                theArrow.style.transform = "rotateX(0deg)";
                            }
                        }
                        let clickedArrow = arrowIcons[i] as HTMLElement;
                        // flip the clicked arrow up or down
                        if(accordionButtons[i].getAttribute("aria-expanded") === "true") {
                            clickedArrow.style.transform = "rotateX(180deg)";
                        } else if(accordionButtons[i].getAttribute("aria-expanded") === "false") {
                            clickedArrow.style.transform = "rotate(0deg)";
                        }
                    })
                }
            }}>
                {`console.log("decks script loaded")`}
            </Script>
            <DecksAccordionHeader deckName={deckName} deckAvatarImg={deckAvatarImg} />
            <DecksAccordionBody deckName={deckName} duelVideosForDeck={duelVideosForDeck} />
        </div>
    );
}