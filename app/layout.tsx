import { Inter } from "next/font/google";
import "./globals.css";
import StickyFooter from "./components/CFooter";
import Navbar from "./components/Navbar";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Callum Person App",
  description:
    "Demonstrator app that uses Next JS 14, MUI, and TypeScript, and Prisma ORM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <StickyFooter />
      </body>
    </html>
  );
}
