import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TanstackProvider from "@/utils/TanstackProvider";
import ReduxStoreProvider from "@/utils/ReduxStoreProvider";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Shopping",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxStoreProvider>
        <TanstackProvider>
          <body className={inter.className}>
            <Header />
            {children}
            <Footer />
            </body>
        </TanstackProvider>
      </ReduxStoreProvider>
    </html>
  );
}
