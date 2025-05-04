import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./lib/components/sidebar";
import { Header } from "./lib/components/header";
import axios from "axios";

axios.defaults.baseURL = process.env.ELIRA_BACKEND ?? "ERR_URL_NOTFOUND";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title:
        process.env.APPLICATION_TITLE ??
        "ELIRA | University of Perpetual Help System GMA",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased `}
            >
                <div className="flex m-3 relative">
                    <Sidebar />
                    <div className="w-full space-y-8">
                        <Header />
                        {children}
                    </div>
                </div>
                <img
                    src="/assets/background.png"
                    alt=""
                    className="w-screen h-screen fixed -z-50 object-cover top-0 left-0 opacity-30"
                />
            </body>
        </html>
    );
}
