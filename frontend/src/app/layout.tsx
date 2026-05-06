import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from 'sonner';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserProvider } from "@/context/UserContext";
import { RecursoProvider } from "@/context/RecursoContext";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body className="bg-white text-black">
        <UserProvider>
          <RecursoProvider>
            <Header />
            {children}
          </RecursoProvider>
        </UserProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
