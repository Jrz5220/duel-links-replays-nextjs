import DeleteVideosForm from "@/app/ui/forms/delete-videos-form";
import { IFavoriteVideos } from "@/app/models/user";

export default function HistorySection({ username, history }: { username: string, history: Array<IFavoriteVideos> }) {
    return(
        <div className="carousel-item p-2 py-4 p-md-4">
            <h2 className="text-center">History</h2>
            {
                history.length > 0 ? 
                <DeleteVideosForm username={username} videos={history} category="history" />
                :
                <p><small className="text-muted">No videos in history</small></p>
            }
        </div>
    )
}