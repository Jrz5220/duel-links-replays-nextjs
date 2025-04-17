import NavLinks from "./nav-links";
import { Button } from "../button";
import styles from "./styles/navbar.module.css";
import { kanit } from "../fonts";
import Link from "next/link";

function NavbarTogglerButton() {
    return(
        <Button className={`navbar-toggler ${styles.myNavbarToggler}`} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </Button>
    );
}

export default function Navbar({ displaySignOutButton = false }: { displaySignOutButton?: boolean }) {
    return(
            <nav id="mainNavbar" className={`navbar navbar-dark bg-dark navbar-expand-lg px-3 ${styles.mainNavbar}`}>
                {/* Link component from next.js prefetches the link page in the background to reduce load times */}
                <Link href={"/"}><span className={`navbar-brand fs-4 ${kanit.className}`}>Duel Links Replays</span></Link>
                <NavbarTogglerButton />
                {/* useFormState error here */}
                <NavLinks displaySignOutButton={displaySignOutButton} />
            </nav>
    );
}