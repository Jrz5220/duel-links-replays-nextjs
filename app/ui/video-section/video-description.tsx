import AddToFavoritesButton from "./add-to-favorites-button";
import styles from "./video-description.module.css";
import auth from "../../../middleware";
import Users from "../../models/user";

export default async function VideoDescription({ duelUploadDate }: { duelUploadDate: string }) {
    const session = await auth();   // I think you can only use auth() in server components
    let userId = null;
    if(session && session.user && session.user.email) {
        // session returns {"user":{"email":"test@wwf.com"},"expires":"2025-04-01T16:47:26.254Z"}
        // session.user returns {"email":"test@wwf.com"}
        console.log("valid session found");
        let user = await Users.findOne({ email: session.user.email }, "_id").exec();
        userId = user.id;
        console.log("user id: " + userId);
    } else {
        console.log("no session");
    }
    return(
        <div className={`d-flex justify-content-between flex-nowrap mx-auto ${styles.videoDescription}`}>
            <p className={`ms-sm-3 ${styles.uploadDate}`}>{duelUploadDate}</p>
            {/* also adds the video to user's history */}
            <AddToFavoritesButton userId={userId} />
        </div>
    )
}