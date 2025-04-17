import { Query } from "mongoose";
import { StaticImageData } from "next/image";
import path from "path";
import { promises as fs } from "fs";
import getDuels from "@/app/lib/duelData";

// extract and export the duel data from the database
// data being extracted from the database is the duel name, duel title, duel date, duel video link, and duel skill data
// the images are being assigned to their proper duel type

// avatar images
import vendreadAvatarSm from "../../public/images/accordian-btn-bg/vendreads/vendread-cover-300x105.jpg";
import vendreadAvatarLg from "../../public/images/accordian-btn-bg/vendreads/vendread-cover-513x180.jpg";
import vampireAvatarSm from "../../public/images/accordian-btn-bg/vampires/vampire-cover-300x105.jpg";
import vampireAvatarLg from "../../public/images/accordian-btn-bg/vampires/vampire-cover-513x180.jpg";
import sacredSoldierAvatarSm from "../../public/images/accordian-btn-bg/sacred-soldier/sacred-soldier-cover-300x105.jpg";
import sacredSoldierAvatarLg from "../../public/images/accordian-btn-bg/sacred-soldier/sacred-soldier-cover-513x180.jpg";
import dinoAvatarSm from "../../public/images/accordian-btn-bg/dinos/dino-cover-300x105.jpg";
import dinoAvatarLg from "../../public/images/accordian-btn-bg/dinos/dino-cover-513x180.jpg";
import archfiendAvatarSm from "../../public/images/accordian-btn-bg/archfiends/archfiend-cover-300x105.jpg";
import archfiendAvatarLg from "../../public/images/accordian-btn-bg/archfiends/archfiend-cover-513x180.jpg";
import psychicAvatarSm from "../../public/images/accordian-btn-bg/psychics/psychic-cover-300x105.jpg";
import psychicAvatarLg from "../../public/images/accordian-btn-bg/psychics/psychic-cover-513x180.jpg";
import amazonAvatarSm from "../../public/images/accordian-btn-bg/amazons/amazon-cover-300x105.jpg";
import amazonAvatarLg from "../../public/images/accordian-btn-bg/amazons/amazon-cover-513x180.jpg";
import elementsaberAvatarSm from "../../public/images/accordian-btn-bg/elementsabers/elementsaber-cover-300x105.jpg";
import elementsaberAvatarLg from "../../public/images/accordian-btn-bg/elementsabers/elementsaber-cover-513x180.jpg";
import rezdAvatrSm from "../../public/images/accordian-btn-bg/rezd/rezd-cover-300x105.jpg";
import rezdAvatarLg from "../../public/images/accordian-btn-bg/rezd/rezd-cover-513x180.jpg";
import geminiAvatarSm from "../../public/images/accordian-btn-bg/gemini/gemini-cover-300x105.jpg";
import geminiAvatarLg from "../../public/images/accordian-btn-bg/gemini/gemini-cover-513x180.jpg";
import specialDuelAvatarSm from "../../public/images/accordian-btn-bg/special-duels/special-duel-cover-300x105.jpg";
import specialDuelAvatarLg from "../../public/images/accordian-btn-bg/special-duels/special-duel-cover-513x180.jpg";
import turboDuelAvatarSm from "../../public/images/accordian-btn-bg/turbo/turbo-duels-cover-300x105.jpg";
import turboDuelAvatarLg from "../../public/images/accordian-btn-bg/turbo/turbo-duels-cover-513x180.jpg";
import otherDuelAvatarSm from "../../public/images/accordian-btn-bg/other/other-duels-cover-300x105.jpg";
import otherDuelAvatarLg from "../../public/images/accordian-btn-bg/other/other-duels-cover-513x180.jpg";
// video link background images
import vsShiranui from "../../public/images/video-link-bg/shiranui.jpg";
import vsChimeraTech from "../../public/images/video-link-bg/chimeratech-rampage-dragon.jpg";
import vsAmazoness from "../../public/images/video-link-bg/amazoness.jpg";
import vsAncientGears from "../../public/images/video-link-bg/ancient-gears.jpg";
import vsAntiTrap from "../../public/images/video-link-bg/anti-trap.jpg";
import vsArmedDragon from "../../public/images/video-link-bg/armed-dragon.jpg";
import vsBatteryman from "../../public/images/video-link-bg/batteryman.jpg";
import vsBlackwings from "../../public/images/video-link-bg/blackwings.jpg";
import vsBlueEyes from "../../public/images/video-link-bg/blue-eyes.jpg";
import vsBurn from "../../public/images/video-link-bg/burn.jpg";
import vsCeruleanSacredPhoenix from "../../public/images/video-link-bg/cerulean-sacred-phoenix.jpg";
import vsCyberEndDragon from "../../public/images/video-link-bg/cyber-end-dragon.jpg";
import vsDarkMagician from "../../public/images/video-link-bg/dark-magician.jpg";
import vsDesperadoDragon from "../../public/images/video-link-bg/desperado-barrel-dragon.jpg";
import vsDestinyHeroes from "../../public/images/video-link-bg/destiny-heroes.jpg";
import vsElementalHeroes from "../../public/images/video-link-bg/elemental-heroes.jpg";
import vsEvilHeroes from "../../public/images/video-link-bg/evil-heroes.jpg";
import vsFortuneLadies from "../../public/images/video-link-bg/fortune-ladies.jpg";
import vsGladiatorBeasts from "../../public/images/video-link-bg/gladiator-beasts.jpg";
import vsGravekeepers from "../../public/images/video-link-bg/gravekeepers.jpg";
import vsInvoker from "../../public/images/video-link-bg/invoker.jpg";
import vsMagicianGirls from "../../public/images/video-link-bg/magician-girls.jpg";
import vsMagnets from "../../public/images/video-link-bg/magnets.jpg";
import vsMaskedBeasts from "../../public/images/video-link-bg/masked-beast-des-gardius.jpg";
import vsNobleKnights from "../../public/images/video-link-bg/noble-knights.jpg";
import vsRedEyesSlash from "../../public/images/video-link-bg/red-eyes-slash-dragon.jpg";
import vsRelinquished from "../../public/images/video-link-bg/relinquished.jpg";
import vsSacredSoldier from "../../public/images/video-link-bg/sacred-soldier.jpg";
import vsSartoriusDesparado from "../../public/images/video-link-bg/sartorius-desperado.jpg";
import vsSilentMagician from "../../public/images/video-link-bg/silent-magician.jpg";
import vsSixSamurai from "../../public/images/video-link-bg/six-samurai.jpg";
import vsSubterrors from "../../public/images/video-link-bg/subterrors.jpg";
import vsSylvans from "../../public/images/video-link-bg/sylvans.jpg";
import vsTopDuelist from "../../public/images/video-link-bg/top-duelist.jpg";
import vsYubel from "../../public/images/video-link-bg/yubel.jpg";
import amazonMirrorMatch from "../../public/images/video-link-bg/amazon-mirror-match.jpg";
import bakuraOTK from "../../public/images/video-link-bg/other-duels/od-bakura-otk.jpg";
import constellarVsBlueEyes from "../../public/images/video-link-bg/other-duels/od-constellar-v-bewd.jpg";
import wiraqochaRasca from "../../public/images/video-link-bg/other-duels/od-wiraqocha-rasca.jpg"
import specialDuelDarkNecrofear1 from "../../public/images/video-link-bg/special-duels/sd-dark-necrofear-1.jpg";
import specialDuelDarkNecrofear2 from "../../public/images/video-link-bg/special-duels/sd-dark-necrofear-2.jpg";
import psychic from "../../public/images/video-link-bg/psychic.jpg";
import tdElementsaberVsLunalights from "../../public/images/video-link-bg/turbo-duels/td-elementsaber-v-lunalights.jpg";
import tdVendreadVsShiranui from "../../public/images/video-link-bg/turbo-duels/td-vendread-v-shiranui.jpg";
// default background image
import defaultImg from "../../public/images/video-link-bg/default.jpg";

export type videoLinkData = {
    routeEndpoint: string;
    bgImage: StaticImageData;
    linkText: Array<string>;
}

export interface DuelProps {
    name: string,
    duels: Array<Query<any, any>>,
    avatarImages: Array<StaticImageData>,
    videoData: Array<videoLinkData>
}

// class theDuel implements DuelProps {
//     constructor(public duels: Array<Query<any, any>>, public avatarImages: Array<StaticImageData>, public videoData: Array<StaticImageData>){}
// }

const linkBackgroundImages = [
    vsAmazoness, vsAncientGears, vsAntiTrap, vsArmedDragon, vsBatteryman, vsBlackwings, vsBlueEyes, vsBurn, vsCeruleanSacredPhoenix, vsChimeraTech, vsCyberEndDragon, vsDarkMagician, vsDesperadoDragon, vsDestinyHeroes, vsElementalHeroes, vsEvilHeroes, vsFortuneLadies, vsGladiatorBeasts, vsGravekeepers, vsInvoker, vsMagicianGirls, vsMagnets, vsMaskedBeasts, vsNobleKnights, vsRedEyesSlash, vsRelinquished, vsSacredSoldier, vsSartoriusDesparado, vsSilentMagician, vsShiranui, vsSixSamurai, vsSubterrors, vsSylvans, vsTopDuelist, vsYubel,
    amazonMirrorMatch, psychic,
    bakuraOTK, constellarVsBlueEyes, wiraqochaRasca,
    specialDuelDarkNecrofear1, specialDuelDarkNecrofear2,
    tdElementsaberVsLunalights, tdVendreadVsShiranui
];

const getIndexOfCapitalLetters = (str: string) : Array<number> => {
    let capitalLetterIndices = [];
    for(let i = 0; i < str.length; i++) {
        if(str[i] >= "A" && str[i] <= "Z") {
            capitalLetterIndices.push(i);
        }
    }
    return capitalLetterIndices;
}

// the return type of an asynchronous function must be a Promise
const getDuelData = async (duelName: string) : Promise<Array<Query<any, any>>> => {
    const { duels, errorMsg } = await getDuels(duelName);
    if(errorMsg) {
        throw new Error(errorMsg);
    }
    // duelData array should have the duels sorted by upload date, where latest upload is first (index 0)
    const duelData: Array<Query<any, any>> = [];
    duels.forEach((duel: Query<any, any>) => {
        duelData.push(duel);
    });
    return duelData;
}

const getDuelVideos = async (deckName: string) : Promise<Array<videoLinkData>> => {
    const { duels, errorMsg } = await getDuels(deckName);
    if(errorMsg) {
        throw new Error(errorMsg)
    }
    let videoLinkDataObjects: Array<videoLinkData> = [];
    let videoRoute: string;
    let videoImage: StaticImageData;
    // RegEx Example: vsYubel.src  returns  /_next/static/media/yubel.cba2b762.jpg
    // RegEx should be able to extract 'yubel' from the vsYubel.src
    const extractImageFileNameRegEx = /(?:(?:\w+?\-?)+)?\w+\.(?:\w+\.)?jpg$/;
    // console.log("----------------------------" + deckName.toUpperCase() + " duels" + "----------------------------");
    duels.forEach((duel: any) => {
        let videoLinkText: Array<string> = [];
        videoRoute = duel.duelName;
        let theDuelName = duel.duelName;
        // extract the opponent name from the duelName, if it exists
        // example, extract shiranui from 'vendread-v-shiranui'
        // use the opponent name to get the image src file for the video link background image
        if (theDuelName.indexOf("od-") === -1 &&
            theDuelName.indexOf("sd-") === -1 &&
            theDuelName.indexOf("td-") === -1 &&
            theDuelName.indexOf("-v-") !== -1 ) {
                videoLinkText[0] = "VS";
                const opponentIndex = duel.title.indexOf("vs") + 3;
                let opponentName = duel.title.slice(opponentIndex).split(" ");
                for(let i = 0; i < opponentName.length; i++) {
                    opponentName[i] = opponentName[i][0].toUpperCase() + opponentName[i].slice(1);
                }
                videoLinkText[1] = opponentName.join(" ");
            } else if (theDuelName.indexOf("od-") === -1 &&
                        theDuelName.indexOf("sd-") === -1 &&
                        theDuelName.indexOf("td-") === -1 &&
                        theDuelName.indexOf("-v-") === -1 ) {
                            // the duelName does not contain an opponent name
                            // default to using the deckName as the image background for the video link
                            // example, if a sacredSoldier duel does not contain an opponent in the duelName,
                            // use sacred-soldier as the image src for the video link
                            let capitalLetters = getIndexOfCapitalLetters(deckName);
                            if(capitalLetters.length > 0) {
                                // the deckName is in camelCase
                                // use a hyphenated format instead of camelCase to match the format of the image names
                                let hyphenatedDeckName = deckName.toLocaleLowerCase().split("");    // turns "deckName" into ["d", "e", ...so on]
                                for(let i = 0; i < capitalLetters.length; i++) {
                                    hyphenatedDeckName.splice(capitalLetters[i], 0, "-");
                                }
                                theDuelName = hyphenatedDeckName.join("");   // turns ["d", "e", ...so on] into "deck-name"
                            }
                            let tmpLinkText = theDuelName.split("-");    // turns "deck-name" into ["deck", "name"]
                            for(let i = 0; i < tmpLinkText.length; i++) {
                                tmpLinkText[i] = tmpLinkText[i][0].toUpperCase() + tmpLinkText[i].slice(1); // turns ["deck", "name"] into ["Deck", "Name"]
                            }
                            videoLinkText[0] = tmpLinkText.join(" ");   // turns ["Deck", "Name"] into "Deck Name"
                            if(duel.duelName.length !== theDuelName.length) {
                                tmpLinkText = duel.duelName.slice(duel.duelName.indexOf(theDuelName) + theDuelName.length + 1).split("-");
                            }
                            for(let i = 0; i < tmpLinkText.length; i++) {
                                tmpLinkText[i] = tmpLinkText[i][0].toUpperCase() + tmpLinkText[i].slice(1);
                            }
                            videoLinkText[1] = tmpLinkText.join(" ");
                            if(videoLinkText[0] === videoLinkText[1]) {
                                videoLinkText[1] = "WATCH";
                            }
                        } else if(theDuelName.indexOf("td-") !== -1 ||
                                  theDuelName.indexOf("sd-") !== -1 ) {
                                        let tmpLinkText = duel.title.split(" ").slice(1);   // return the duel title without the "TD:" or "SD:" at the beginning
                                        videoLinkText[0] = tmpLinkText.slice(0, tmpLinkText.indexOf("vs")).join(" ");
                                        videoLinkText[1] = tmpLinkText.slice(tmpLinkText.indexOf("vs") + 1).join(" ");
                                    } else if(theDuelName.indexOf("od-") !== -1) {
                                        if(duel.title.split(" ").indexOf("vs") > 0) {
                                            let tmpLinkText = duel.title.split(" ");
                                            videoLinkText[0] = tmpLinkText.slice(0, tmpLinkText.indexOf("vs")).join(" ");
                                            videoLinkText[1] = tmpLinkText.slice(tmpLinkText.indexOf("vs") + 1).join(" ");
                                            
                                        } else {
                                            videoLinkText[0] = duel.title;
                                            videoLinkText[1] = "";
                                        }
                                    }
        // use the opponent name or deck name (if no opponent was provided) to get the image src file
        for(let i = 0; i < linkBackgroundImages.length; i++) {
            let imageSrcFile: RegExpExecArray | string | null = extractImageFileNameRegEx.exec(linkBackgroundImages[i].src);
            if(imageSrcFile === undefined || imageSrcFile === null) {
                // an image file name could not be found in this image file
                continue;
            }
            imageSrcFile = imageSrcFile.toString();
            const imageFileName = imageSrcFile?.slice(0, imageSrcFile.indexOf(".")).toString(); // remove the .randomletters.jpg extension
            if(theDuelName.indexOf("td-") !== -1 || theDuelName.indexOf("sd-") !== -1 || theDuelName.indexOf("od-") !== -1) {
                // use the full duel name as the image source file
                if(imageFileName.indexOf(theDuelName) !== -1) {
                    videoImage = linkBackgroundImages[i];
                    break;
                }
            } else if(theDuelName.indexOf("-v-") !== -1 && theDuelName.indexOf(imageFileName) !== -1) {
                let opponentIndex = theDuelName.indexOf("-v-") + 3;
                let opponent = theDuelName.slice(opponentIndex);
                if(imageFileName.indexOf(opponent) !== -1) {
                    videoImage = linkBackgroundImages[i];
                    break;
                }
            } else if(theDuelName.indexOf(imageFileName) !== -1) {
                videoImage = linkBackgroundImages[i];
                break;
            }
            videoImage = defaultImg;
        }
        let videoDataLinkObject: videoLinkData = {
            routeEndpoint: videoRoute,  // string
            bgImage: videoImage,        // StaticImage
            linkText: videoLinkText     // Array<string>
        }
        videoLinkDataObjects.push(videoDataLinkObject);
    });
    return videoLinkDataObjects;
}

export const vendreadDuels: DuelProps = {
    name: "vendreads",
    duels: await getDuelData("vendread"),
    avatarImages: [vendreadAvatarSm, vendreadAvatarLg],
    videoData: await getDuelVideos("vendread")
}
export const vampireDuels: DuelProps = {
    name: "vampires",
    duels: await getDuelData("vampire"),
    avatarImages: [vampireAvatarSm, vampireAvatarLg],
    videoData: await getDuelVideos("vampire")
} 
export const sacredSoldierDuels: DuelProps = {
    name: "sacredSoldier",
    duels: await getDuelData("sacredSoldier"),
    avatarImages: [sacredSoldierAvatarSm, sacredSoldierAvatarLg],
    videoData: await getDuelVideos("sacredSoldier")
}
export const dinoDuels: DuelProps = {
    name: "dinos",
    duels: await getDuelData("dino"),
    avatarImages: [dinoAvatarSm, dinoAvatarLg],
    videoData: await getDuelVideos("dino")
}
export const archfiendDuels: DuelProps = {
    name: "archfiends",
    duels: await getDuelData("archfiend"),
    avatarImages: [archfiendAvatarSm, archfiendAvatarLg],
    videoData: await getDuelVideos("archfiend")
}
export const psychicDuels: DuelProps = {
    name: "psychics",
    duels: await getDuelData("psychic"),
    avatarImages: [psychicAvatarSm, psychicAvatarLg],
    videoData: await getDuelVideos("psychic")
}
export const amazonDuels: DuelProps = {
    name: "amazons",
    duels: await getDuelData("amazon"),
    avatarImages: [amazonAvatarSm, amazonAvatarLg],
    videoData: await getDuelVideos("amazon")
}
export const elementsaberDuels: DuelProps = {
    name: "elementsabers",
    duels: await getDuelData("elementsaber"),
    avatarImages: [elementsaberAvatarSm, elementsaberAvatarLg],
    videoData: await getDuelVideos("elementsaber")
}
export const rezdDuels: DuelProps = {
    name: "rezd",
    duels: await getDuelData("redEyesZombieDragon"),
    avatarImages: [rezdAvatrSm, rezdAvatarLg],
    videoData: await getDuelVideos("redEyesZombieDragon")
}
export const geminiDuels: DuelProps = {
    name: "gemini",
    duels: await getDuelData("gemini"),
    avatarImages: [geminiAvatarSm, geminiAvatarLg],
    videoData: await getDuelVideos("gemini")
}
export const specialDuels: DuelProps = {
    name: "specialDuels",
    duels: await getDuelData("specialDuel"),
    avatarImages: [specialDuelAvatarSm, specialDuelAvatarLg],
    videoData: await getDuelVideos("specialDuel")
}
export const turboDuels: DuelProps = {
    name: "turboDuels",
    duels: await getDuelData("turboDuel"),
    avatarImages: [turboDuelAvatarSm, turboDuelAvatarLg],
    videoData: await getDuelVideos("turboDuel")
}
export const otherDuels: DuelProps = {
    name: "otherDuels",
    duels: await getDuelData("otherDuel"),
    avatarImages: [otherDuelAvatarSm, otherDuelAvatarLg],
    videoData: await getDuelVideos("otherDuel")
}



// not needed (recursion practice)
const getImageFilesFrom = async (dir?: string) => {
    console.log("current dir: " + dir);
    if(dir == undefined || dir == "") {
        return [];
    } else {
        // process.cwd() returns the current working directory
        let imagesDirectory = path.join(process.cwd(), dir);
        // place all content in this directory inside imageFileNames as strings
        let imageFileNames = await fs.readdir(imagesDirectory);
        let subDirectoryImages: string[] = [];
        const regEx = /\w*\.jpg$/;
        // check for any subdirectories that may contain images
        for(let i = 0; i < imageFileNames.length; i++) {
            if(!regEx.test(imageFileNames[i])) {
                // subdirectory found
                console.log("sub directory found: " + imageFileNames[i]);
                console.log("getting all images from sub directory: " + dir + "/" + imageFileNames[i]);
                subDirectoryImages = await getImageFilesFrom(dir + "/" + imageFileNames[i]);
                // remove the subdirectory
                imageFileNames.splice(i, 1);
                // move the counter back one spot to avoid skipping over the element that gets indexed where the subdirectory was
                i--;
                console.log("returned to directory '" + dir + "' with additional images: " + subDirectoryImages);
                // push the subdirectory images into imageFileNames
                for(let i = 0; i < subDirectoryImages.length; i++) {
                    imageFileNames.push(subDirectoryImages[i]);
                }
            }
        }
        console.log("ALL IMAGES RETRIEVED FROM DIRECTORY '" + dir + "': " + imageFileNames);
        return imageFileNames;
    }
}