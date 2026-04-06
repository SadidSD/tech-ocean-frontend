import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./style.css";
import "./header.css";
import "./home.css";
import "./pages.css";
import ClientApplication from "@/components/ClientApplication";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech X Ocean - Ocean of IT Products",
  description: "TechX Ocean - Your ultimate destination for top quality CCTV, Gaming PCs, Laptops, and tech accessories in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <ClientApplication>
          {children}
        </ClientApplication>
      </body>
    </html>
  );
}
