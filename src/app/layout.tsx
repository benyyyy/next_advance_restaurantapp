import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/footer/page";
import Navbar from "@/components/navbar/page";
import { CartProvider } from "@/context/CartContext/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RestaurantApp - Next.js Template",
  description: "A modern restaurant application built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
          <Navbar /> {/* ✅ Now inside CartProvider */}
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
