import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserProvider } from "@/context/UserContext";
import { RecursoProvider } from "@/context/RecursoContext";
import { Inter, Libre_Baskerville } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seu Recurso",
  description: "Sistema de recursos de multas online",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={` ${inter.variable} ${libreBaskerville.variable} `}
    >
      <body className="font-text text-texto bg-fundo">
        <UserProvider>
          <RecursoProvider>{children}</RecursoProvider>
        </UserProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
