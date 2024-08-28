import connectDB from "./connectDB";
import duels from "../models/duel";

export default async function getDuels(duelDeck: String) {
    await connectDB();

    try {
        let results: any;
        switch(duelDeck) {
            case "vendread":
                results = duels.vendreadDuel;
                break;
            case "vampire":
                results = duels.vampireDuel;
                break;
            case "sacedSoldier":
                results = duels.sacredSoldierDuel;
                break;
            case "dino":
                results = duels.dinoDuel;
                break;
            case "archfiend":
                results = duels.archfiendDuel;
                break;
            case "psychic":
                results = duels.psychicDuel;
                break;
            case "amazon":
                results = duels.amazonDuel;
                break;
            case "elementsaber":
                results = duels.elementsaberDuel;
                break;
            case "redEyesZombieDragon":
                results = duels.redEyesZombieDuel;
                break;
            case "gemini":
                results = duels.geminiDuel;
                break;
            case "specialDuel":
                results = duels.specialDuel;
                break;
            case "turboDuel":
                results = duels.turboDuel;
                break;
            case "otherDuel":
                results = duels.otherDuel;
                break;
            default:
                throw new Error("deck [" + duelDeck + "] not found");
        }
        results = await results.find({});   // find all the duels associated with that deck
        return {duels: results};            // key: duels, value: array of duels
    } catch(error: any) {
        return {errorMsg: error.message};
    }
}

