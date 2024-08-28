import Image from "next/image";
import styles from "./page.module.css";
import { audiowide, ptSansCaption, kanit } from "./ui/fonts";
import Navbar from "./ui/navbar/navbar";
import Footer from "./ui/footer/footer";
import getUsers from "./lib/userData";
import getDuels from "./lib/duelData";
import duels from "./models/duel";
import user from "./models/user";
import Hero from "./ui/hero/hero";
import HomeDescriptionSection from "./ui/home-description-section/home-description-section";
import LatestUploadsSection from "./ui/latest-uploads-section/latest-uploads";

async function fetchUsers() {
  console.log("fetching users from database...");
  const { users, errorMsg } = await getUsers();
  if(!users) {
    throw new Error(errorMsg);
  }
  console.log("successfully fetched users");
  console.log("users fetched: " + JSON.stringify(users));
  return users;
}

async function fetchDuels(duelDeck: String) {
  const { duels, errorMsg } = await getDuels(duelDeck);   // returns an object containing one item, the array of duels
  if(errorMsg) {
    throw new Error(errorMsg);
  }
  return duels;
}

// this should be the index page
export default async function Home() {
  const users = await fetchUsers();
  const duels = await fetchDuels("dino");

  return(
    <main>
      <Navbar />
      <header>
        <Hero />
      </header>
      <HomeDescriptionSection />
      <LatestUploadsSection />
      <section>
        <article>
          <h3 className={kanit.className}>Duel Videos</h3>
          <p className={`header ${ptSansCaption.className}`}>
            View duel replays from yu-gi-oh duel links!
          </p>
        </article>
      </section>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
      <h3 id="#download">Downloads</h3>
      <h3>Display Users Here...</h3>
      <ul>
        {users.map((user: any) => {
          return  <li key={user._id}>
                    {user.username}
                    <ul>
                      <li>email: {user.email}</li>
                      <li>login attempts: {user.attempts}</li>
                      <li>number of favorites: {user.favorites.length}</li>
                      <li>number in hitory: {user.history.length}</li>
                      <li>last login attempt: {JSON.stringify(user.last)}</li>
                    </ul>
                  </li>
        })}
      </ul>
      <div>
        <h3>Display Duel Video Here...</h3>
        <video controls style={{width: "900px"}}>
          <source src="https://d1yqznrypzyedi.cloudfront.net/psychic/psychic-1.mp4" type="video/mp4" />
        </video>
      </div>
      <div>
        <h3>Duel Model</h3>
        <p>Retrieve and display a user's data using the mongoose ODM</p>
        <h4>Dino</h4>
        <ul>
          {duels.map((duel: any) => {
            return  <li key={duel._id}>
                      {duel.title}<br/>
                      {duel.skill}<br/>
                      {duel.uploadDate}
                    </li>
          })}
        </ul>
      </div>
      <h3 id="decks">Decks</h3>
      <p>Decks here</p>
      <Footer />
    </main>
  );
}
