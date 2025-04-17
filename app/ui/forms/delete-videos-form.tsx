"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles/deleteFavoriteVideosForm.module.css";
import { deleteVideos } from "@/app/lib/actions";
import { faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { IFavoriteVideos } from "@/app/models/user";
import Image from "next/image";

// favorites: Array<Object> did not work because, somehow, that is not serializable in the Client (answer in second paragraph below)
// only plain javascript objects are allowed as props to Client Components (Array<Object> does work with Server Components)
// Instead I had to convert the objects retrieved from the database in DashboardTabContents (server component) into an array of strings using map().
// Then convert that Array<string> into another array of strings within the client (idk why but it doesn't work if I try to use favorites directly)
// If I needed the entire object from the database instead of just a single prop (video.duelTitle),
// I could have converted each object from the database into a string using JSON.stringyfy() and placed each string in an array.
// Then convert that Array of JSON formatted strings back into JSON within the Client using JSON.parse().

// A serializable object is an object that can be converted to a string and back to an object without losing information.
// This is typically done using JSON.stringify() and JSON.parse() methods in JavaScript.
// In Next.js, when passing props from server components to client components, the data must be serializable.
// This is because server components can return complex objects, including functions and class instances, which cannot be serialized.
// When you pass props to a client component, Next.js serializes the data to send it over the network.
// If the data is not serializable, it can lead to errors or unexpected behavior in the client component.
// In this case, the array of objects (Array<Object>) is not serializable because it contains complex objects.
// Instead, you can convert the objects into a serializable format (like an array of strings) before passing them to the client component.
// This way, the data can be easily serialized and deserialized without losing any information.
// The array of strings is serializable because it only contains primitive values (strings), which can be easily converted to and from JSON.
// https://developer.mozilla.org/en-US/docs/Glossary/Serializable_object
export default function DeleteVideosForm({ username, videos, category }: { username: string, videos: Array<IFavoriteVideos>, category: "favorites" | "history" }) {
    // pass additional arguments to the server action
    // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments
    const updateFavoritesWithUsername = deleteVideos.bind(null, username, category);
    const { pending } = useFormStatus();

    return(
        <form action={updateFavoritesWithUsername}>
            <fieldset>
                <legend className={styles.formLegend}>Delete from favorites</legend>
                {videos.map((video: IFavoriteVideos, index: number) => {
                return(
                        <div key={index} className={`d-flex justify-content-start align-items-center p-2 py-3 p-md-3 ${styles.checkboxContainer}`}>
                            <input type="checkbox" id={video.duelName} className={styles.checkboxInput} name="videoToDelete" value={video.duelName} />
                            <label htmlFor={video.duelName} className="d-flex justify-content-md-start align-items-center ms-3 mx-md-4">
                                <Link href={`/duel-video/${video.duelName}`} className={`d-block mb-3 mb-md-0 me-md-3 ${styles.savedVideoLink}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Watch Video">
                                    <div className={`d-block ${styles.videoPosterContainer}`}>
                                        <Image src={`/images/video-posters/${video.duelName}.jpg`} className={`d-block ${styles.videoPosterImage}`} width={1200} height={652} alt="Duel Video Poster" />
                                    </div>
                                    <div className={`d-flex justify-content-center align-items-center ${styles.playIconContainer}`}>
                                        <FontAwesomeIcon icon={faPlay} className={styles.faPlayIcon} />
                                    </div>
                                </Link>
                                <h3 className={`m-0 ${styles.savedVideoHeader} d-flex flex-direction-column`}>{video.duelTitle}</h3>
                            </label>
                        </div>
                    )
                })}
            </fieldset>
            <button type="submit" className={`px-3 py-2 my-3 ${styles.deleteVideoBtn}`} aria-disabled={pending}>Delete <FontAwesomeIcon icon={faTrash} className="ps-2" /></button>
        </form>
    )
}