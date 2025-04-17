import ChangePasswordForm from "@/app/ui/forms/change-password-form";
import auth from "../../../../../middleware";
import User from "../../../../models/user";
import ChangeEmailForm from "@/app/ui/forms/change-email-form";
import styles from "./styles/settings-section.module.css";

export default async function SettingsSection({ username }: { username: string }) {
    const session = await auth();
    let user = null;
    if(session && session.user) {
        user = await User.findOne({ username: username }, "email password").exec();
    }
    if(!user) throw new Error("Failed to authenticate logged in user. Please sign out and try again.");

    return(
        <div className="carousel-item p-4 pb-5">
            <h2 className="text-center p-4">Account Settings</h2>
            <div className="d-flex flex-column align-items-center justify-content-center flex-md-row">
                <div className="d-flex flex-column align-items-center justify-content-center flex-md-row">
                    <div className="mb-5 mb-md-0 me-md-5">
                        <ChangePasswordForm username={username} />
                    </div>
                    <div className="align-self-md-start ms-md-5">
                        <div className="mb-4">
                            <h3 className={`mb-3 ${styles.currEmailHeader}`}>Email</h3>
                            <p>{user.email}</p>
                        </div>
                        <ChangeEmailForm username={username} currentEmail={user.email} />
                    </div>
                </div>
            </div>
        </div>
    )
}