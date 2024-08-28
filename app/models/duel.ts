import mongoose from "mongoose";

const yugiohCardSchema = new mongoose.Schema({
    htmlId: String,
    imgDir: String,
    name: String,
    type: String,
    effect: String,
    level: Number,
    attribute: String,
    summonRequirement: String,
    atk: Number,
    def: Number
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