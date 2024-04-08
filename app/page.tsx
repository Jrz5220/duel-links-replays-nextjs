import Image from "next/image";
import styles from "./page.module.css";
import { audiowide, ptSansCaption, kanit } from "./ui/fonts";

// this should be the index page
export default function Home() {
  return(
    <main>
      <header>
        <h1 className={`${audiowide.className} ${styles.header}`}>
          Duel Links Replays
        </h1>
      </header>
      <section>
        <article>
          <h3 className={kanit.className}>Duel Videos</h3>
          <p className={ptSansCaption.className}>
            View duel replays from yu-gi-oh duel links!
          </p>
        </article>
      </section>
    </main>
  );
}
