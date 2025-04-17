"use client"

import Script from "next/script"; 

export default function FavBtnScript() {
    // Uncaught (in promise) Error: Invalid hook call. Hooks can only be called inside of the body of a function component.

    return (
        <Script
            id="favBtnScript"
            onReady={() => {
                async function getData() {
                    try {
                        console.log("fetching data from " + window.location.host + "/api/testAPI/testAPI.tsx");
                        const response = await fetch("../pages/api/testAPI");
                        if(!response.ok) {
                            console.log(response);
                            throw new Error("HTTP Error! " + response.status + " " + response.text());
                        }
                        const json = await response.json();
                        console.log(json);
                    } catch(err) {
                        throw err;
                    }
                }
                const favBtn = document.getElementById("addToFavBtn");
                if(favBtn) {
                    const favBtnClasses = Array.from(favBtn.classList);
                    const isFavoriteClass = favBtnClasses[favBtnClasses.length - 1];
                    const navbarItems = document.getElementsByClassName("nav-item");
                    let isSignedIn = navbarItems[navbarItems.length - 1].id === "loginFormListItem" ? false : true;
                    // let isSignedIn = true;
                    if(isSignedIn) {
                        // check if this video is a user favorite
                        // if true, do not remove the isFavorite class
                        // else, remove the isFavorite class
                        getData();
                    } else {
                        // remove the last class name from favBtn
                        console.log("no signed in user");
                        favBtn.classList.remove(isFavoriteClass);
                    }
                }
            }}>
            {`console.log("fav-btn script loaded")`}
        </Script>
    )
}