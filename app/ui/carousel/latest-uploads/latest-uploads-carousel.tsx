import Link from "next/link";
import { Button } from "../../button";
import styles from "./page.module.css"

export default function LatestUploadsCarousel() {
    const videoLinks = [
        {active: true, link: process.env.VIDEO_STORAGE + "/vampire/vampire-v-relinquished.mp4", title: "Vampires vs Relinquished"},
        {active: false, link: process.env.VIDEO_STORAGE + "/vendread/vendread-v-lightsworn.mp4", title: "Vendreads vs Lightsworns"},
        {active: false, link: process.env.VIDEO_STORAGE + "/dino/dino-v-sartorius-desperado.mp4", title: "Dinos vs Sartorius Desparado"}
    ];

    return (
        <div id="carouselExampleIndicators" className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="false">
            <div className="carousel-indicators mb-0">
                <button className={`active ${styles.indicatorButton}`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
                <button className={styles.indicatorButton} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button className={styles.indicatorButton} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {videoLinks.map((video, index) => (
                    <article key={index} className={`carousel-item ${video.active == true && "active"}`}>
                        <div className="video-wrapper mx-auto">
                            <video id={`video-${index + 1}`} className="video-js vjs-big-play-centered">
                                <source src={video.link} type="video/mp4" />
                                <p className="vjs-no-js">
                                    To view this video please enable JavaScript, and consider upgrading to a web browser that
                                    <Link href={"https://videojs.com/html5-video-support/"} target="_blank">supports HTML5 video</Link>
                                </p>
                            </video>
                        </div>
                        <h3 className={`text-center p-4 ${styles.latestUploadTitle}`}>{video.title}</h3>
                    </article>
                ))}
            </div>
            <button className={`carousel-control-prev ${styles.prevButton}`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className={`carousel-control-prev-icon ${styles.prevIcon}`} aria-hidden="true"><i className={`fas fa-chevron-left ${styles.fontAwesome}`}></i></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className={`carousel-control-next ${styles.nextButton}`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className={`carousel-control-next-icon ${styles.nextIcon}`} aria-hidden="true"><i className={`fas fa-chevron-right ${styles.fontAwesome}`}></i></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}