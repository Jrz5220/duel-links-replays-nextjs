"use client";   // hooks, like useState and useEffect, can only be used in client components

import styles from "./video-description.module.css";
import { IFavoriteVideos } from "@/app/models/user";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function AddToFavoritesButton({ userId }: { userId: string | null }) {
    const [favBtnClicked, setFavBtnClicked] = useState(false);  // notifies us if the button was clicked
    const [handleBtnClick, setHandleBtnClick] = useState(false);    // used to check if we need to perform any actions in useEffect when the btn is clicked
    const [addToHistory, setAddToHistory] = useState(true);     // if true, add video to user's history. else, don't because it was just added to history (duplicate button click)
    const updateFavBtnStyle = (theBtn: HTMLElement, forScreenReader: Element, action: string) => {
        if(action.toLowerCase() === "add") {
            theBtn.setAttribute("title", "Add to favorites");
            theBtn.setAttribute("aria-label", "Add video to favorites");
            forScreenReader.textContent = "Add video to favorites";
        } else if(action.toLowerCase() === "remove") {
            theBtn.setAttribute("title", "Remove from favorites");
            theBtn.setAttribute("aria-label", "Remove video from favorites");
            forScreenReader.textContent = "Remove video from favorites";
        }
    }

    // useEffect executes its callback function after the first initial render.
    // By default, it also runs after every subsequent re-render.
    // check if this works as intended after a page refresh
    useEffect(() => {
        // the function we want to run everytime our dependencies (defined in the second array parameter) changes values
        const doEverything = async () => {
            let favBtn = document.getElementById("addToFavBtn");
            let videoTitle = document.getElementById("videoTitle")?.textContent;
            if(!videoTitle) { videoTitle = "" }
            let duelName = document.getElementsByClassName("videoWrapper")[0].id;
            let accessibleNameEl = document.getElementsByClassName("accessibleName")[0];
            let userFavorites: Array<IFavoriteVideos> | null = null;
            let isFavorite = false;
            // check if the video is already a favorite
            try {
                if(userId) {
                    if(addToHistory) {
                        // first, add this video to user's history on initial render
                        const historyResponse = await fetch(
                            "../../api/users/" + userId + "/history",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                // the data we want to send to the api route
                                body: JSON.stringify({ newVideo: { duelTitle: videoTitle, duelName: duelName } })
                            }
                        );
                        if(!historyResponse.ok) {
                            let errMsg = await historyResponse.json();
                            throw new ReferenceError(
                                `Failed to log video to user's history. Status: ${historyResponse.status}; Message: ${errMsg.message}`, 
                                { cause: { status: historyResponse.status } }
                            );
                            // originally, I wanted to display the error message in a <p> element in the html, under the #addToFavBtn button
                            // but I felt a serious server error like this one should redirect to it's own error page, which is error.tsx
                        }
                    }
                    const response = await fetch(
                        "../../api/users/" + userId + "/favorites",
                        {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                        }
                    );
                    // response.ok checks if the status code is between 200-299 (successful responses)
                    if(!response.ok) {
                        let errMsg = await response.json();
                        throw new Error(
                            `Failed to retrieve user favorites. Status: ${response.status}; Message: ${errMsg.message}`
                            , { cause: { status: response.status } }
                        );
                    }
                    const json = await response.json(); // the api response contains json data
                    userFavorites = json.favorites;
                    if(userFavorites) {
                        for(let i = 0; i < userFavorites.length; i++) {
                            if(userFavorites[i] && userFavorites[i].duelTitle.localeCompare(videoTitle, "en") === 0) {
                                isFavorite = true;
                                break;
                            }
                        }
                    } else {
                        throw new Error("Failed to load video data. Please try refreshing the page or signing in again.");
                    }
                }
                if(!userId || (userId && !isFavorite)) {
                    if(favBtn) { updateFavBtnStyle(favBtn, accessibleNameEl, "add"); }
                } else {
                    if(favBtn) { updateFavBtnStyle(favBtn, accessibleNameEl, "remove"); }
                }

                // SECTION: Handling the button clicks

                // user clikced the button but is not logged in so ask them to sign in
                if(!userId && handleBtnClick) {
                    // if the navbar-toggler button is display: block, the hamburger menu icon is displayed
                    const navbarToggler = document.getElementsByClassName("navbar-toggler")[0];
                    const togglerStyles = window.getComputedStyle(navbarToggler);
                    const togglerDisplay = togglerStyles.display;
                    if(togglerDisplay.localeCompare("block", "en") === 0) {
                        // expand the hamburger menu (to show the user they must sign in to favorite a video)
                        // remove class 'collapsed' from the navbar-toggler button (to expand the contents of the hamburger menu)
                        // change the navbar-toggler button 'aria-exapnded' attribute to true
                        // add the class 'show' to the #navbarSupportedContent div
                        navbarToggler.classList.remove("collapsed");
                        navbarToggler.setAttribute("aria-expanded", "true");
                        document.getElementById("navbarSupportedContent")?.classList.add("show");
                    }
                    // display the login form (within the hamburger menu) with the message "Please sign in"
                    // remove the class 'collapsed' from the login-btn (in nav-links component)
                    // change the aria-expanded attribute of the login-btn to true
                    // add the class "show" to the #loginFormListItem (nav-links component)
                    // remove any text inside the #loginWarning div (login-form component)
                    // append <p>Please sign in</p> to #loginWarning
                    // scroll to the top of the page
                    let loginBtn = document.getElementsByClassName("login-btn")[0];
                    loginBtn.classList.remove("collapsed");
                    loginBtn.setAttribute("aria-expanded", "true");
                    let loginForm = document.getElementById("loginFormListItem");
                    loginForm?.classList.add("show");
                    let loginWarningMsg = document.getElementById("loginWarning");
                    if(loginWarningMsg) {
                        loginWarningMsg.innerHTML = "";
                        loginWarningMsg.innerHTML = "<p>Please sign in</p>";
                    }
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    });
                } else if(userId && handleBtnClick) {
                    // add video to favorites IF the video doesn't already exist in favorites
                    // ELSE remove the video from favorites
                    if(!isFavorite) {
                        // add video to favorites
                        let response = await fetch(
                            "../../api/users/" + userId + "/favorites",
                            { 
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ newVideo: { duelTitle: videoTitle, duelName: duelName } })
                            }
                        );
                        if(!response.ok) {
                            let errMsg = await response.json();
                            throw new Error(
                                `Failed to add video to favorites. Status: ${response.status}; Message: ${errMsg.message}`, 
                                { cause: { status: response.status } }
                            );
                        }
                        let json = await response.json();
                        // update the favBtn to a remove btn
                        if(favBtn) { updateFavBtnStyle(favBtn, accessibleNameEl, "remove"); }
                    } else {
                        // remove video from favorites
                        let response = await fetch(
                            "../../api/users/" + userId + "/favorites",
                            {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({videoToDelete: { duelTitle: videoTitle, duelName: duelName }})
                            }
                        );
                        if(!response.ok) {
                            let errMsg = await response.json();
                            throw new Error(
                                `Failed to remove video from favorites. Status: ${response.status}; Message: ${errMsg.message}`,
                                { cause: { status: response.status } }
                            );
                        }
                        let json = await response.json();
                        if(favBtn) { updateFavBtnStyle(favBtn, accessibleNameEl, "add"); }
                    }
                }
            } catch(error: any) {
                // use redirect: https://nextjs.org/docs/app/api-reference/functions/redirect#client-component
                // or set the forScreenReader text to the error message, if it is appropriate
                throw new Error("The favorites button failed to work. Please try again later");
            }
        }

        doEverything();

        return () => {
            // reset the handleBtnClick state to false so that the useEffect hook doesn't run again when the component unmounts
            setHandleBtnClick(false);
            if(addToHistory) { setAddToHistory(false); }
        }

    }, [favBtnClicked]);   // the dependency array (if no dependencies are provided, the hook will still run at least once, when the component first mounts)
    
    // this function is called when the button is clicked
    // sets the favBtnClicked state to true, which will trigger the useEffect hook to add or remove the video from favorites
    // we need to set handleBtnClick to true so that useEffect will only add the video to favorites when the button is clicked and not when the component initially renders
    // without this, useEffect would save every video to favorites when the page intially loads, which is not what we want
    const handleFavBtnClick = () => {
        setHandleBtnClick(true);
        setFavBtnClicked(favBtnClicked ? false : true);
    }
    
    return(
        <button type="button" id="addToFavBtn" className={`me-sm-3 position-relative ${styles.favBtn} ${styles.isFavorite}`} onClick={() => { handleFavBtnClick() }} name="favBtn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Remove from favorites" aria-label="Remove video to favorites">
            <FontAwesomeIcon icon={faHeart} className="d-flex justify-content-end align-items-center" />
            <p className={`accessibleName ${styles.accessibleName} ${styles.forScreenReader}`}>Remove video from favorites</p>
        </button>
    )
}