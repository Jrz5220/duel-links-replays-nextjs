import LoginForm from "../forms/login-form";
import Link from "next/link";
import styles from "./styles/navLinks.module.css";
import auth from "../../../middleware"; // we are using middleware instead of useSession to check for a user session
import User from "../../models/user";
import { signOut } from "@/auth";

const signInNavLink = () => {
    return(
        <ul className={`navbar-nav flex-wrap justify-content-end ms-auto`}>
            <li className="nav-item px-3"><Link href="/#decks" className={`nav-link ${styles.myNavLink}`}>Decks</Link></li>
            <li className="nav-item px-3"><Link href="/#download" className={`nav-link ${styles.myNavLink}`}>Download</Link></li>
            <li className="nav-item px-3 d-flex align-items-center">
                <button className={`nav-link login-btn ${styles.myNavLink} ${styles.loginBtn}`} type="button" data-bs-toggle="collapse" data-bs-target="#loginFormListItem" aria-expanded="false" aria-controls="loginFormListItem">Sign In</button>
            </li>
            <li id="loginFormListItem" className={`nav-item px-3 py-1 collapse ${styles.loginItem}`}>
                <div className="d-flex flex-column align-items-lg-end">
                    {/* useFormState error here */}
                    <LoginForm />
                    <div className="mt-2">
                        <Link href={"/create-account"} className={styles.createAccountLink}>
                            Create Account
                        </Link>
                    </div>
                </div>
            </li>
        </ul>
    )
};

const accountNavLink = (signOutButton: boolean, username: string) => {
    return(
        <ul className={`navbar-nav flex-wrap justify-content-end ms-auto`}>
            <li className="nav-item px-3"><Link href="/#decks" className={`nav-link ${styles.myNavLink}`}>Decks</Link></li>
            <li className="nav-item px-3"><Link href="/#download" className={`nav-link ${styles.myNavLink}`}>Download</Link></li>
            {
                signOutButton ?
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
                :
                <li className="nav-item px-3"><Link className={`nav-link ${styles.myNavLink}`} href={`/dashboard/${username}`}>{username}</Link></li>
            }
        </ul>
    )
};

export default async function NavLinks({ displaySignOutButton }: { displaySignOutButton: boolean }) {
    let isLoggedIn = false;
    let user = null;
    try {
        const session = await auth();
        if(session && session.user) {
            console.log("user session: " + JSON.stringify(session.user));
            let userEmail = session.user.email;
            user = await User.findOne({email: userEmail}, "username").exec();  // only retrieve the username field (_id field is retrieved as well by default)
            console.log("found user: " + JSON.stringify(user)); // user is null (userEmail does not match any in database)
            isLoggedIn = true;
        }
    } catch(e) {
        // could not check if a user was logged in
        console.log(e);
        throw e;
    }

    return (
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
            {
                isLoggedIn ? 
                accountNavLink(displaySignOutButton, user.username)
                :
                signInNavLink()
            }
        </div>
    );
}