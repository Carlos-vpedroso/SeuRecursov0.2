import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { RecursoProvider } from "@/context/RecursoContext";
import { Inter, Libre_Baskerville } from "next/font/google";
import { UserProvider } from "@/context/UserContext";

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
  metadataBase: new URL("https://derrubamulta.com"),

  title: {
    default: "Derruba Multa | Recursos de Multas Online",
    template: "%s | Derruba Multa",
  },

  description:
    "Crie seu recurso de multa de trânsito online de forma simples, rápida e eficaz. Prepare sua defesa e organize seu recurso para protocolar junto ao DETRAN.",

  applicationName: "Derruba Multa",

  keywords: [
    "recurso de multa",
    "recurso de multa online",
    "defesa de multa",
    "defesa de trânsito",
    "contestar multa",
    "contestar multa de trânsito",
    "recurso de trânsito",
    "multa de trânsito",
    "DETRAN",
    "recurso DETRAN",
    "defesa de autuação",
    "recurso administrativo de multa",
  ],

  authors: [
    {
      name: "Derruba Multa",
      url: "https://derrubamulta.com",
    },
  ],

  creator: "Derruba Multa",
  publisher: "Derruba Multa",

  alternates: {
    canonical: "https://derrubamulta.com",
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/icons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/icons/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/icons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],

    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://derrubamulta.com",
    siteName: "Derruba Multa",
    title: "Derruba Multa | Recursos de Multas Online",
    description:
      "Crie seu recurso de multa de trânsito online de forma simples, rápida e eficaz. Prepare sua defesa e organize seu recurso para protocolar junto ao DETRAN.",
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "Derruba Multa - Recursos de Multas Online",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Derruba Multa | Recursos de Multas Online",
    description:
      "Crie seu recurso de multa de trânsito online de forma simples, rápida e eficaz.",
    images: ["/icons/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
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
