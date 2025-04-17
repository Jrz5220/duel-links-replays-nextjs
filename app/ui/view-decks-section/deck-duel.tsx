"use client";

import { videoLinkData } from "@/app/lib/HomePageDuelImages";
import Link from "next/link";
import Image from "next/image";
import { audiowide } from "../fonts";
import { useState, useEffect } from "react";
import styles from "./styles/deck-duel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// returns the image name with spaces instead of hyphens or underscores
const altName = (imageFile: string) : string => {
    const regex = /[\W_]/g;
    const fileType = imageFile.indexOf(".");
    if(fileType !== -1) {
        imageFile = imageFile.slice(0, fileType);
    }
    let newName = imageFile.replace(regex, " ");
    return newName;
}

export default function DeckDuel({ index, duelVideo }: { index: number, duelVideo: videoLinkData }) {
    // this component is used to display the duel video links in the deck section of the home page
    const [loading, setLoading] = useState(false);
    const [clickedLink, setClickedLink] = useState("link-0");
    useEffect(() => {
        if(loading) {
            // append a new style element to the head of the document
            const newStyleEl = document.head.appendChild(document.createElement("style"));
            // make the ::before pseudo element of the clicked link have an opacity of 0.8
            // we have to do it this way because the ::before pseudo element is not part of the DOM and can't accessed directly
            newStyleEl.innerHTML = `#${clickedLink}::before {opacity: 0.8; }`;
        }
    }, [loading]);

    return (
        <div key={index} className={`col-lg-6 ${styles.videoLinkContainer}`}>
            <div className={`${styles.videoLinkContent}`}>
                <div id={`link-${index}`} className={styles.videoLinkImage}>
                    <Image className="d-block" src={duelVideo.bgImage} alt={altName(duelVideo.bgImage.src)} />
                </div>
                <h4 className={`position-absolute ${styles.videoLinkHeader} ${audiowide.className}`}>
                    <Link href={`/duel-video/${duelVideo.routeEndpoint}`} onClick={() => { setLoading(true); setClickedLink(`link-${index}`) }} data-bs-toggle="tooltip" data-bs-placement="top" title="Watch Video">
                        {
                            loading ? <span className={`d-flex justify-content-center align-items-center ${styles.faContainer}`}><FontAwesomeIcon icon={faSpinner} className={styles.rotateSpinner} /></span> :
                            <span className={`link-text ${styles.linkText}`}>{duelVideo.linkText[0]} <span className={styles.opponent}>{duelVideo.linkText[1]}</span></span>
                        }
                    </Link>
                </h4>
            </div>
        </div>
    )
}