import DeleteVideosForm from "@/app/ui/forms/delete-videos-form";
import { IFavoriteVideos } from "@/app/models/user";

export default function FavoritesSection({ username, favorites }: { username: string, favorites: Array<IFavoriteVideos> }) {
    return(
        <div className="carousel-item active p-2 py-4 p-md-4">
            <h2 className="text-center">Favorites</h2>
            {
                favorites.length > 0 ? 
                <DeleteVideosForm username={username} videos={favorites} category="favorites" />
                :
                <p><small className="text-muted">You have no favorites</small></p>
            }
        </div>
    )
}