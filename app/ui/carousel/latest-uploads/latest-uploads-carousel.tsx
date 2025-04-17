import { Button } from "../../button";
import styles from "./styles/latest-uploads-carousel.module.css";
import VideoPlayer from "../../video-player/video-player";
import { kanit } from "../../fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function LatestUploadsCarousel() {
    const videoLinks = [
        {active: true, link: process.env.VIDEO_STORAGE + "/vampire/vampire-v-relinquished.mp4", poster: "./images/video-posters/vampire-v-relinquished.jpg", title: "Vampires vs Relinquished"},
        {active: false, link: process.env.VIDEO_STORAGE + "/vendread/vendread-v-lightsworn.mp4", poster: "./images/video-posters/vendread-v-lightsworn.jpg", title: "Vendreads vs Lightsworns"},
        {active: false, link: process.env.VIDEO_STORAGE + "/dino/dino-v-sartorius-desperado.mp4", poster: "./images/video-posters/dino-v-sartorius-desperado.jpg", title: "Dinos vs Sartorius Desparado"}
    ];

    return (
        <div id="carouselVideosIndicators" className="carousel slide mb-4">
            <div className="carousel-indicators mb-0">
                <button className={`active mx-2 ${styles.indicatorButton}`} type="button" data-bs-target="#carouselVideosIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
                <button className={`mx-2 ${styles.indicatorButton}`} type="button" data-bs-target="#carouselVideosIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button className={`mx-2 ${styles.indicatorButton}`} type="button" data-bs-target="#carouselVideosIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {videoLinks.map((video, index) => (
                    <article key={index} className={`carousel-item ${video.active == true ? "active" : ""}`}>
                        <div className={`mx-auto ${styles.videoWrapper}`}>
                            <VideoPlayer videoSource={video.link} posterImage={video.poster} videoType={"video/mp4"} />
                        </div>
                        <h3 className={`text-center p-4 ${styles.latestUploadTitle} ${kanit.className}`}>{video.title}</h3>
                    </article>
                ))}
            </div>
            <Button className={`carousel-control-prev ${styles.prevButton}`} type="button" data-bs-target="#carouselVideosIndicators" data-bs-slide="prev">
                <span className={`carousel-control-prev-icon ${styles.prevIcon}`} aria-hidden="true">
                    <FontAwesomeIcon icon={faChevronLeft} className={styles.fontAwesome} />
                </span>
                <span className="visually-hidden">Previous</span>
            </Button>
            <Button className={`carousel-control-next ${styles.nextButton}`} type="button" data-bs-target="#carouselVideosIndicators" data-bs-slide="next">
                <span className={`carousel-control-next-icon ${styles.nextIcon}`} aria-hidden="true">
                    <FontAwesomeIcon icon={faChevronRight} className={styles.fontAwesome} />
                </span>
                <span className="visually-hidden">Next</span>
            </Button>
        </div>
    );
}