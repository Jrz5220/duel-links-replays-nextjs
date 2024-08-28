import LoginForm from "../forms/login-form";
import Link from "next/link";
import styles from "./styles/navLinks.module.css";
import { useSession } from "next-auth/react";   // for testing
import { signOut, auth } from "@/auth";

export default async function NavLinks({ displaySignOutButton }: { displaySignOutButton: boolean }) {
    const isSignedIn = await auth();
    const user = isSignedIn?.user;
    console.log("auth props: " + JSON.stringify(isSignedIn));
    console.log("logged in user: " + JSON.stringify(user));
    return (
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className={`navbar-nav flex-wrap justify-content-end ms-auto`}>
                <li className="nav-item px-3"><Link href="/#decks" className={`nav-link ${styles.myNavLink}`}>Decks</Link></li>
                <li className="nav-item px-3"><Link href="/#download" className={`nav-link ${styles.myNavLink}`}>Download</Link></li>
                {
                    isSignedIn ? 
                    <li className="nav-item px-3"><Link className={`nav-link ${styles.myNavLink}`} href="/#download">Account</Link></li>
                    :
                    <li className="nav-item px-3 d-flex align-items-center">
                        <button className={`nav-link ${styles.myNavLink} ${styles.loginBtn}`} type="button" data-bs-toggle="collapse" data-bs-target="#loginFormListItem" aria-expanded="false" aria-controls="loginFormListItem">Sign In</button>
                    </li>
                }
                {
                    !isSignedIn && 
                    <li id="loginFormListItem" className={`nav-item px-3 py-1 collapse ${styles.loginItem}`}>
                        <div className="d-flex flex-column align-items-lg-end">
                            <LoginForm />
                            <div className="mt-2">
                                <Link href={"/create-account"} className={styles.createAccountLink}>
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </li>
                }
                {
                    displaySignOutButton &&
                    <li className="nav-item px-3">
                        <div className="d-flex flex-column align-items-lg-end">
                            <form className="p-0 m-0" action={async () => {
                                "use server"
                                await signOut();
                            }}>
                                <button type="submit" className={`nav-link ${styles.myNavLink} ${styles.loginBtn}`}>
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </li>
                }
            </ul>
        </div>
    );
}

// can you check if the user is logged in through auth?