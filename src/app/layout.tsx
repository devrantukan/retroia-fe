import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import Appbar from "./components/Appbar";
import SignInPanel from "./components/signInPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Retroia Real Estate",
  description: "Retroia Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Providers>
          <Appbar>{/* <SignInPanel /> */}</Appbar>
          {children}
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
