import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import ToastProvider from "./components/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Venkatraman Nagarajan — Senior Full Stack Engineer",
  description:
    "Portfolio of Venkatraman Nagarajan, a Senior Full Stack Engineer with 10+ years of experience in .NET Core, Azure, React, and enterprise cloud architecture across FinTech, Healthcare, and Retail domains.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
