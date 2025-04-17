import { Metadata } from "next";
import React from "react";
import Navbar from "../ui/navbar/navbar";
import Footer from "../ui/footer/footer";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            {/* the <body> tag is in the RootLayout component (/app/layout.tsx) */}
            <Navbar displaySignOutButton={true} />
            {children}
            <Footer />
        </div>
    )
}