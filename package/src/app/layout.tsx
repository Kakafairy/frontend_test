import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer/Footer";
import Providers from "../providers/Provider";
import { Instrument_Serif, Inter_Tight } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${instrumentSerif.variable}`}
    >
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="antialiased font-inter-tight">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
