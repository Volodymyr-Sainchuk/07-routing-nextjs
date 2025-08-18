"use client";

import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

enum Tags {
  All = "All",
  Work = "Work",
  Personal = "Personal",
  Todo = "Todo",
  Meeting = "Meeting",
  Shopping = "Shopping",
}

const tags = [
  { id: Tags.All, name: "All" },
  { id: Tags.Work, name: "Work" },
  { id: Tags.Personal, name: "Personal" },
  { id: Tags.Todo, name: "Todo" },
  { id: Tags.Meeting, name: "Meeting" },
  { id: Tags.Shopping, name: "Shopping" },
];

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Suspense fallback={null}>
            <Header tags={tags} />
          </Suspense>

          {children}
          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
