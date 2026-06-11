"use client";
import Hero from "./_components/Hero";
import { useAuth } from "@/hook/useAuth";
import { RecursoContext } from "@/context/RecursoContext";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Multas from "./_components/Multas";
import Testimonials from "./_components/Testimonials";
import Faq from "./_components/Faq";
import Footer from "./_components/Footer";

export default function Home() {
  const { multas, loading, setSelectedMulta } = useAuth(RecursoContext);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;

      if (window.scrollY > heroHeight - 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="relative select-none">
      <Header visible={showHeader} position="fixed" />
      <Hero />
      <Multas />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}
