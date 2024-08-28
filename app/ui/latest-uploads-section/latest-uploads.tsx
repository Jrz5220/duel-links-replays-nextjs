import LatestUploadsAccordian from "../carousel/latest-uploads/latest-uploads-carousel";
import styles from "./latestUploads.module.css"
import BackgroundPattern from "../bg-pattern/background-pattern"
import LatestUploadsCarousel from "../carousel/latest-uploads/latest-uploads-carousel";

export default function LatestUploadsSection() {
    return (
        <section className={`p-4 ${styles.latestUploadsSection}`}>
            <BackgroundPattern />
            <h2 className="display-5 text-center my-4">Latest Uploads</h2>
            <LatestUploadsCarousel />
        </section>
    );
}