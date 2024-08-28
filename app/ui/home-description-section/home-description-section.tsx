import HomeDescriptionBox from "../home-description-box/home-description-box";

export default function HomeDescriptionSection() {
    return(
        <section className="container-fluid p-4">
            <div className="row">
                <HomeDescriptionBox
                    fontAwesomeIconClass="fas fa-play-circle"
                    title="Duel Replays"
                    mainText="Watch some of my favorite duel links replay videos"
                    />
                <HomeDescriptionBox
                    fontAwesomeIconClass="fas fa-crown"
                    title="King of Games"
                    mainText="King of Games Duelist and KC Cup competitor"
                    />
                <HomeDescriptionBox
                    fontAwesomeIconClass="fas fa-heart"
                    title="Popular Cards"
                    mainText="View popular cards used in the duel replays"
                    />
            </div>
        </section>
    );
}