import styles from "./page.module.css";
import BackgroundPattern from "../ui/bg-pattern/background-pattern";
import Navbar from "../ui/navbar/navbar";
import RegisterSection from "../ui/register-section/register-section";

export default function CreateAccount() {
    return (
        <div className={`position-relative ${styles.fullWH} ${styles.coloredBg} ${styles.overflow}`}>
            <BackgroundPattern />
            <Navbar />
            <RegisterSection />
        </div>
    );
}