import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Jumian - Online Shopping for Electronics, Fashion & More",
  description: "Shop online for electronics, fashion, home appliances, beauty products and more at the best prices on Jumian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-jumia-light">
        <Providers>
          <Header />
          <CategoryNav />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
