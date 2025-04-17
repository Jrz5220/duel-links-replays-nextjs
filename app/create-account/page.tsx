import Navbar from "../ui/navbar/navbar";
import CreateAccountBackgroundPattern from "../ui/bg-pattern/create-account-page-pattern";
import RegisterSection from "../ui/register-section/register-section";
import styles from "./page.module.css";

export default function CreateAccount() {
    return (
        <div className={`position-relative ${styles.fullWH} ${styles.coloredBg} ${styles.overflow}`}>
            <CreateAccountBackgroundPattern />
            <Navbar />
            <RegisterSection />
        </div>
    );
}