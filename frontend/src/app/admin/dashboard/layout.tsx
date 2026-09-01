import { DashboardProvider } from "@/context/DashboardContext";
import SidebarMenu from "./_components/SidebarMenu";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      <Suspense fallback={null}>
        <div className="bg-fundo2 text-texto2 block min-h-screen lg:flex">
          <SidebarMenu />

          {children}
        </div>
      </Suspense>
    </DashboardProvider>
  );
}
