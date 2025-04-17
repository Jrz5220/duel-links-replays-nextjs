import DeleteVideosForm from "@/app/ui/forms/delete-videos-form";
import styles from "./styles/dashboard-tab-content.module.css";
import auth from "../../../../../middleware";
import User from "../../../../models/user";
import FavoritesSection from "./favorites-section";
import { IFavoriteVideos } from "../../../../models/user";
import HistorySection from "./history-section";
import SettingsSection from "./settings-section";

export default async function DashboardTabContent({ username }: { username: string }) {
    const session = await auth();
    let user = null;
    if(session && session.user) {
        user = await User.findOne({ username: username }, "username email password favorites history").exec();
    }
    if(!user) throw new Error("Failed to authenticate logged in user. Please sign out and try again.");
    // let formatFavs: Array<string> = user.favorites.map((video: any) => (
    //     '{"duelName": ' + video.duelName + ', "duelTitle": ' + video.duelTitle + '}'
    // ));
    let formatFavs: Array<IFavoriteVideos> = [];
    let formatHist: Array<IFavoriteVideos> = [];
    for(let i = 0; i < user.favorites.length; i++) {
        formatFavs.push(
            {
                duelTitle: user.favorites[i].duelTitle,
                duelName: user.favorites[i].duelName,
            }
        )
    }
    for(let i = 0; i < user.history.length; i++) {
        formatHist.push(
            {
                duelTitle: user.history[i].duelTitle,
                duelName: user.history[i].duelName,
            }
        )
    }

    return (
        <div id="accountTabsContent" className={`carousel slide ${styles.accountTabsContent} ${styles.gridItem}`}>
            <div className="carousel-inner">
                {/* all the tab content goes in here */}
                <FavoritesSection username={username} favorites={formatFavs} />
                <HistorySection username={username} history={formatHist} />
                <SettingsSection username={username} />
                {/* end of tab content */}
            </div>
        </div>
    )
}