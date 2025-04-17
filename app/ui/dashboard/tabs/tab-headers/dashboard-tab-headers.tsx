"use client";

import styles from "./dashboard-tab-headers.module.css";
import { useEffect, useState } from "react";

export default function DashboardTabHeaders() {
    const [carouselBtnClicked, setCarouselBtnClicked] = useState(false);
    const [handleCarouselBtnClick, setHandleCarouselBtnClick] = useState(false);
    const [newActiveCarouselBtn, setNewActiveCarouselBtn] = useState("0");

    useEffect(() => {
        if(handleCarouselBtnClick) {
            // find the btn that currently has the active class and remove it
            // the btn that was clicked gets the active
            let carouselBtns = document.getElementsByClassName("carousel-tab");
            for(let i = 0; i < carouselBtns.length; i++) {
                let carouselBtn = carouselBtns[i];
                if(carouselBtn.classList.contains("active")) {
                    carouselBtn.classList.remove("active");
                    carouselBtn.removeAttribute("aria-current");
                }
                if(carouselBtn.getAttribute("data-bs-slide-to") == newActiveCarouselBtn) {
                    carouselBtn.classList.add("active");
                    carouselBtn.setAttribute("aria-current", "true");
                }
            }
        }

        return () => {
            setHandleCarouselBtnClick(false);
        }
    }, [carouselBtnClicked]);

    const handleBtnClick = (slide: string) => {
        setHandleCarouselBtnClick(true);
        setNewActiveCarouselBtn(slide);
        setCarouselBtnClicked(carouselBtnClicked ? false : true);
    }

    return(
        <div className={`carousel-indicators justify-content-between flex-md-column justify-content-md-start align-items-md-start ${styles.tabsContainer} ${styles.gridItem}`}>
            <button type="button" className={`carousel-tab d-block active ${styles.carouselTab}`} data-bs-target="#accountTabsContent" data-bs-slide-to="0" aria-label="Slide 1" aria-current="true" onClick={() => { handleBtnClick("0")} }>Favorites</button>
            <button type="button" className={`carousel-tab d-block ${styles.carouselTab}`} data-bs-target="#accountTabsContent" data-bs-slide-to="1" aria-label="Slide 2" onClick={() => { handleBtnClick("1")} }>History</button>
            <button type="button" className={`carousel-tab d-block ${styles.carouselTab}`} data-bs-target="#accountTabsContent" data-bs-slide-to="2" aria-label="Slide 3" onClick={() => { handleBtnClick("2")} }>Settings</button>
        </div>
    )
}

// 