import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans, Inter, Jersey_10 } from "next/font/google";
import "./globals.css";

import Provider from "./provider";
import { MockAuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GameFont = Jersey_10({
  subsets: ['latin'],
  variable: '--font-game',
  weight: ['400']
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Teacher - Learn Anything with AI",
  description: "An interactive, gaming-themed platform to learn coding and other subjects using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MockAuthProvider>
      <html lang="en" suppressHydrationWarning={true} >
        <body
          className={`${geistSans.variable} ${geistMono.variable}
        ${GameFont.variable} ${inter.variable}
        antialiased`}
        >
          <Provider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </Provider>

        </body>
      </html>
    </MockAuthProvider>
  );
}
