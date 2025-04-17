import Navbar from "./ui/navbar/navbar";
import Hero from "./ui/hero/hero";
import HomeDescriptionSection from "./ui/home-description-section/home-description-section";
import LatestUploadsSection from "./ui/latest-uploads-section/latest-uploads";
import ViewDecksSection from "./ui/view-decks-section/view-decks-section";
import DownloadDuelLinksSection from "./ui/download-duel-links-section/download-duel-links-section";
import Footer from "./ui/footer/footer";

export default async function Home() {
  return(
    <>
      {/* the useFormState in Navbar has been changed to use useActionState. Problem is this version of Nextjs does not recognize useActionState. useFormState still works fine though.*/}
      <Navbar />
      <header>
        <Hero />
      </header>
      <HomeDescriptionSection />
      <LatestUploadsSection />
      <ViewDecksSection />
      <DownloadDuelLinksSection />
      <Footer />
    </>
  );
}
