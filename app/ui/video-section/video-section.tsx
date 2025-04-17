import styles from "./video-section.module.css";
import VideoPlayer from "../video-player/video-player";
import VideoDescription from "./video-description";

export default async function VideoSection({ duelTitle, duelName, duelUploadDate, collectionName }: { duelTitle: string, duelName: string, duelUploadDate: string, collectionName: string | null }) {
    if(collectionName === null) {
        throw new Error("The duel video is not available at the moment");
    }

    return (
        <section id="videoSection" className={`container-fluid py-5 ${styles.videoContainer}`}>
            <h1 id="videoTitle" className={`display-5 mb-5 text-center`}>{duelTitle}</h1>
            <div id={duelName} className={`mx-auto pb-2 videoWrapper ${styles.videoWrapper}`}>
                <VideoPlayer videoSource={process.env.VIDEO_STORAGE + "/" + collectionName + "/" + duelName + ".mp4"} posterImage={"../../images/video-posters/" + duelName + ".jpg"} videoType={"video/mp4"}  />
            </div>
            <VideoDescription duelUploadDate={duelUploadDate} />
        </section>
    )
}