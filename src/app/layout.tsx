import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sansFont = Urbanist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tondory",
    description: "Blog Reading Tracker",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={sansFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
