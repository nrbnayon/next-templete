"use client";

import React from "react";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} fallback-font antialiased`}
      >
        <ReduxProvider>
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </ReduxProvider>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
