import type { Metadata } from "next";
import { ptSansCaption } from "./ui/fonts";
import 'bootstrap/dist/css/bootstrap.css';
import 'video.js/dist/video-js.css';
// import 'video.js/dist/video-js.min.css';
import "./globals.css";
import BootstrapClient from "./lib/BootstrapClient";  // contains the bootstrap JS
import Script from "next/script";
// use fontawesome react components to avoid hydration errors
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;  // Tell Font Awesome to not add its CSS automatically
import { SessionProvider } from "next-auth/react";

// the viewport is automatically set and manual configuration is usually not needed as the default is sufficient
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
        <SessionProvider>
        {children}
        </SessionProvider>
        <BootstrapClient />
        <Script src="https://kit.fontawesome.com/550ddecd5b.js" strategy="beforeInteractive" crossOrigin="anonymous" />
        <Script src="https://vjs.zencdn.net/7.17.0/video.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.sc.gl/videojs-hotkeys/0.2/videojs.hotkeys.min.js" />
      </body>
    </html>
  );
}
