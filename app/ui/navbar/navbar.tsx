import NavLinks from "./nav-links";
import { Button } from "../button";
import styles from "./styles/navbar.module.css";
import { kanit } from "../fonts";
import Link from "next/link";

export default function Navbar() {
    return (
            <nav className={`navbar navbar-dark bg-dark navbar-expand-lg px-3 ${styles.mainNavbar}`}>
                <Link href={"/"}><span className={`navbar-brand fs-4 ${kanit.className}`}>Duel Links Replays</span></Link>
                <NavbarTogglerButton />
                <NavLinks displaySignOutButton={false} />
            </nav>
    );
}

function NavbarTogglerButton() {
    return(
        <Button className={`navbar-toggler ${styles.myNavbarToggler}`} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </Button>
    );
}