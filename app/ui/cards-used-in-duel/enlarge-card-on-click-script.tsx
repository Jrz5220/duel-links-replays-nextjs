"use client"

import Script from "next/script"

export default function EnlargeCardOnClickScript() {
    return(
        <Script
            id="cardAnimation"
            onReady={() => {
                // without the onReady event handler, this script will only load when this component mounts for the first time.
                // if you try to re-render this component with different cards, the script will not take effect.
                // https://nextjs.org/docs/pages/api-reference/components/script#onready
                let yugiohCards = document.getElementsByClassName("yugiohCard");
                let clickableClass = yugiohCards[0].classList[yugiohCards[0].classList.length - 1];
                for(let i = 0; i < yugiohCards.length; i++) {
                    if(yugiohCards[i].classList.contains(clickableClass)) {
                        yugiohCards[i].addEventListener("click", (event) => {
                            // prevent the other cards from being clickable
                            for(let j = 0; j < yugiohCards.length; j++) {
                                yugiohCards[j].classList.remove(clickableClass);
                            }
                            let enlargedCard = document.getElementById("expanded-" + yugiohCards[i].id + "-card");
                            if(enlargedCard !== null) {
                                let hideCardClass = enlargedCard.classList[enlargedCard.classList.length - 1];
                                enlargedCard.classList.remove(hideCardClass);
                                let cardsUsedContainer = document.getElementById("cardsUsedInDuel");
                                cardsUsedContainer?.scrollIntoView({ behavior: 'smooth'});
                                let closeBtn = document.getElementById("close-" + yugiohCards[i].id + "-card");
                                closeBtn?.addEventListener("click", (e) => {
                                    enlargedCard.classList.add(hideCardClass);
                                    // apply the clickable class back to all cards
                                    for(let k = 0; k < yugiohCards.length; k++) {
                                        yugiohCards[k].classList.add(clickableClass);
                                    }
                                })
                            }
                        })
                    }
                }
            }}>
                {`console.log("cardAnimation script loaded")`}
            </Script>
    )
}