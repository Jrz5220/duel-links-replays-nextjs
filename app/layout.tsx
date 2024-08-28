import type { Metadata } from "next";
import { ptSansCaption } from "./ui/fonts";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import BootstrapClient from "./lib/BootstrapClient";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "Duel Links Replays",
    default: "Duel Links Replays"
  },
  description: "View competitive duel videos from the mobile game Yu-Gi-Oh! Duel Links. The replay videos include duels from gold rank through king of games, as well as the KC cup and special events.",
  authors: [{name: "Felix Lazo", url: "https://jrz5220.github.io/felixlazo/"}],
  keywords: ["Yu-Gi-Oh", "Duel Links", "Replays"],

};

// the root component
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={ptSansCaption.className}>
        {children}
        <Script src="https://kit.fontawesome.com/550ddecd5b.js" crossOrigin="anonymous" />
        <BootstrapClient />
      </body>
    </html>
  );
}
