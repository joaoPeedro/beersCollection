import { NavBar } from "@/components/navBar/navBar";
import "../styles/base.scss";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export const metadata = {
  title: "Beers collection",
  description:
    "Let your taste buds travel the world with an array of exquisite brews waiting for you to discover.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <header>
          <Suspense fallback={null}>
            <NavBar />
          </Suspense>
        </header>
        {children}
      </body>
    </html>
  );
}
