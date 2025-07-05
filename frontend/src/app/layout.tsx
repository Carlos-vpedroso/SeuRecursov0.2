import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context";
import Header from "@/components/Header";
import { Toaster } from 'sonner';


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
    <html lang="pt-BR">
      <body className="bg-white text-black">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
