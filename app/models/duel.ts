import mongoose from "mongoose";

// interface representing a yugiohcard document in MongoDB
// https://mongoosejs.com/docs/typescript.html
export interface IYugiohCard {
    htmlId: string;
    imgDir: string;
    name: string;
    type: string;
    effect: string;
    level: number;
    attribute: string;
    summonRequirement: string;
    atk: number;
    def: number;
}

// Mongoose assigns each of your schemas an _id field by default if one is not passed into 
// the Schema constructor. The type assigned is an ObjectId to coincide with MongoDB's 
// default behavior. https://mongoosejs.com/docs/guide.html#_id
// So there is no difference between explicitly declaring the _id prop in your Schemas or not

const yugiohCardSchema = new mongoose.Schema<IYugiohCard>({
    htmlId: { type: String, required: true },
    imgDir: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    effect: { type: String, required: true },
    level: { type: Number, required: true },
    attribute: { type: String, required: true },
    summonRequirement: { type: String, required: true },
    atk: { type: Number, required: true },
    def: { type: Number, required: true }
}, {timestamps: true});

const YugiohCard = mongoose.models.YugiohCard || mongoose.model("YugiohCard", yugiohCardSchema);

const duelSchema = new mongoose.Schema({
    duelName: String,
    title: String,
    cards: [{type: mongoose.Schema.ObjectId, ref: "YugiohCard"}],
    skill: String,
    skillDetail: String,
    containsSkillCard: Boolean,
    skillCardPath: String,
    skillCardName: String,
    skillCardType: String,
    skillCardEffect: String,
    uploadDate: String
}, {timestamps: true});

const duels = {
    vendreadDuel: mongoose.models.Vendread || mongoose.model("Vendread", duelSchema),
    vampireDuel: mongoose.models.Vampire || mongoose.model("Vampire", duelSchema),
    sacredSoldierDuel: mongoose.models.SacredSoldier || mongoose.model("SacredSoldier", duelSchema),
    dinoDuel: mongoose.models.Dino || mongoose.model("Dino", duelSchema),
    archfiendDuel: mongoose.models.Archfiend || mongoose.model("Archfiend", duelSchema),
    psychicDuel: mongoose.models.Psychic || mongoose.model("Psychic", duelSchema),
    amazonDuel: mongoose.models.Amazon || mongoose.model("Amazon", duelSchema),
    elementsaberDuel: mongoose.models.Elementsaber || mongoose.model("Elementsaber", duelSchema),
    redEyesZombieDuel: mongoose.models.RedEyesZombie || mongoose.model("RedEyesZombie", duelSchema),
    geminiDuel: mongoose.models.Gemini || mongoose.model("Gemini", duelSchema),
    specialDuel: mongoose.models.SpecialDuel || mongoose.model("SpecialDuel", duelSchema),
    turboDuel: mongoose.models.TurboDuel || mongoose.model("TurboDuel", duelSchema),
    otherDuel: mongoose.models.OtherDuel || mongoose.model("OtherDuel", duelSchema),
}

export default duels;