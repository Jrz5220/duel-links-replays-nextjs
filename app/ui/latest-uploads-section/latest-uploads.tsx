import styles from "./latestUploads.module.css"
import BackgroundPattern from "../bg-pattern/default-background-pattern"
import LatestUploadsCarousel from "../carousel/latest-uploads/latest-uploads-carousel";
import { kanit } from "../fonts";

export default function LatestUploadsSection() {
    return (
        <section className={`p-4 ${styles.latestUploadsSection}`}>
            <BackgroundPattern numOfRows={4} />
            <h2 className={`display-5 text-center my-4 ${kanit.className}`}>Latest Uploads</h2>
            <LatestUploadsCarousel />
        </section>
    );
}