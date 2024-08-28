import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid-container account-page-grid">
            {/* place imported Navbar here */}
            {/* place imported Header here */}
            {/* place import Tabs here */}
            {children}
        </div>
    )
}