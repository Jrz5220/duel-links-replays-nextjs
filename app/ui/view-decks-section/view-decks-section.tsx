import { kanit } from "../fonts";
import DeckItem from "./decks";
import { vendreadDuels, vampireDuels, sacredSoldierDuels, dinoDuels, archfiendDuels, psychicDuels, amazonDuels, elementsaberDuels, rezdDuels, geminiDuels, specialDuels, turboDuels, otherDuels } from "@/app/lib/HomePageDuelImages";

const allDeckTypes = [
    vendreadDuels,
    vampireDuels,
    sacredSoldierDuels,
    dinoDuels,
    archfiendDuels,
    psychicDuels,
    amazonDuels,
    elementsaberDuels,
    rezdDuels,
    geminiDuels,
    specialDuels,
    turboDuels,
    otherDuels    
]

export default async function ViewDecksSection() {
    return(
        <section id="decks" className="p-5">
            <h2 className={`text-center my-4 display-5 ${kanit.className}`}>Decks</h2>
            <div className="container">
                <div id="decksAccordion" className="accordian">
                    {allDeckTypes.map((deckType, index) => {
                        return <DeckItem key={index} deckName={deckType.name} deckAvatarImg={deckType.avatarImages} duelVideosForDeck={deckType.videoData} />
                    })}
                </div>
            </div>
        </section>
    );
}