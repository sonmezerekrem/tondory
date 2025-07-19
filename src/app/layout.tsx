import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { PWAInstaller } from "@/components/pwa-installer";
import { Toaster } from "sonner";

const sansFont = Urbanist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tondory - Blog Reading Tracker",
    description: "Track, organize, and bookmark your favorite blog posts and articles. Never lose track of what you've read with Tondory's intelligent reading tracker.",
    metadataBase: new URL('https://tondory.com'),
    keywords: ["blog tracker", "reading tracker", "article bookmarks", "blog posts", "reading list", "productivity"],
    authors: [{ name: "Tondory" }],
    creator: "Tondory",
    publisher: "Tondory",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://tondory.com',
        title: 'Tondory - Blog Reading Tracker',
        description: 'Track, organize, and bookmark your favorite blog posts and articles. Never lose track of what you\'ve read with Tondory\'s intelligent reading tracker.',
        siteName: 'Tondory',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Tondory - Blog Reading Tracker',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tondory - Blog Reading Tracker',
        description: 'Track, organize, and bookmark your favorite blog posts and articles. Never lose track of what you\'ve read.',
        images: ['/og-image.png'],
        creator: '@tondory',
        site: '@tondory',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="light-content" />
            <meta name="apple-mobile-web-app-title" content="Tondory" />
            <meta name="application-name" content="Tondory" />
            <meta name="msapplication-TileColor" content="#0ea5e9" />
            <meta name="theme-color" content="#0ea5e9" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <script defer src="https://cloud.umami.is/script.js" data-website-id={process.env.ANALYTICS_ID}></script>
        </head>
        <body className={sansFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ServiceWorkerRegister />
          {children}
          <PWAInstaller />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
        </body>
        </html>
    );
}
