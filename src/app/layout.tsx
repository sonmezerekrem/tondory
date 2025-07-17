import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";

const sansFont = Urbanist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tondory",
    description: "Blog Reading Tracker",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={sansFont.className}>
        {children}
        </body>
        </html>
    );
}
