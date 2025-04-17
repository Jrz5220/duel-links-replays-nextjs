import duels from "@/app/models/duel";
import CardsUsedInDuelSection from "@/app/ui/cards-used-in-duel/cards-used-in-duel";
import Navbar from "@/app/ui/navbar/navbar";
import VideoSection from "@/app/ui/video-section/video-section";
import auth from "../../../middleware"; // https://nextjs.org/learn/dashboard-app/adding-authentication#protecting-your-routes-with-nextjs-middleware

export interface IDuelSkillData {
    skill: string;
    skillDetail: string;
    containsSkillCard: boolean;
    skillCardPath: string | null;
    skillCardName: string | null;
    skillCardType: string | null;
    skillCardEffect: string | null;
}

export default async function DuelVideoPage({ params }: { params: { duelname: string } }) {
    let { duelname } = await params;   // dynamic APIs are now asynchronous - https://nextjs.org/docs/messages/sync-dynamic-apis#why-this-warning-occurred
    const dbCollections = [
        "amazon", 
        "archfiend", 
        "dino", 
        "elementsaber", 
        "gemini", 
        "other-duel", 
        "psychic", 
        "rezd", 
        "sacred-soldier", 
        "special-duel", 
        "turbo-duel", 
        "vampire", 
        "vendread"
    ];
    let collection = null;
    let theDuelObject = null;
    let duelSkillData : IDuelSkillData = {
        skill: "Not Found",
        skillDetail: "Skill effect could not be found",
        containsSkillCard: false,
        skillCardPath: null,
        skillCardName: null,
        skillCardType: null,
        skillCardEffect: null
    };
    for(const [key, duelModel] of Object.entries(duels)) {
        // populate("cards") matches the ObjectId's in the "cards" array to their corresponding documents in the "yugiohcards" collection
        theDuelObject = await duelModel.findOne({duelName: duelname}).populate("cards").exec();
        if(theDuelObject !== null) {
            if(duelname.indexOf("td-") !== -1) {
                collection = "turbo-duel";
            } else if(duelname.indexOf("sd-") !== -1) {
                collection = "special-duel";
            } else if(duelname.indexOf("od-") !== -1) {
                collection = "other-duel";
            } else if(duelname.indexOf("-v-") !== -1) {
                // my deck type is before this index
                // opponent name starts after this index
                let opponentIndex = duelname.indexOf("-v-");
                let deckTypeChars = [];
                for(let i = 0; i < opponentIndex; i++) {
                    deckTypeChars.push(duelname[i]);
                }
                collection = deckTypeChars.join("");
            } else {
                for(let i = 0; i < dbCollections.length; i++) {
                    if(duelname.indexOf(dbCollections[i]) !== -1) {
                        // Assertion: duelname does not contain two collection names
                        // Ex: sacred-soldier-amazon-combo (this duelname is just an example, it does not exist)
                        // would cause 'amazon' to be set as the collection instead of 'sacred-soldier'
                        // because 'amazon' comes before 'sacred-soldier' in dbCollections
                        collection = dbCollections[i];
                        break;
                    }
                }
            }
            if(typeof theDuelObject.skill == "string" && typeof theDuelObject.skillDetail == "string") {
                duelSkillData.skill = theDuelObject.skill;
                duelSkillData.skillDetail = theDuelObject.skillDetail;
                duelSkillData.containsSkillCard = theDuelObject.containsSkillCard;
                duelSkillData.skillCardPath = theDuelObject.skillCardPath;
                duelSkillData.skillCardName = theDuelObject.skillCardName;
                duelSkillData.skillCardType = theDuelObject.skillCardType;
                duelSkillData.skillCardEffect = theDuelObject.skillCardEffect;
            }
            break;
        }
    }
    return (
        <div>
            <Navbar />
            <VideoSection duelTitle={theDuelObject.title} duelName={theDuelObject.duelName} duelUploadDate={theDuelObject.uploadDate} collectionName={collection} />
            <CardsUsedInDuelSection cards={theDuelObject.cards} skill={duelSkillData}/>
        </div>
    );
}