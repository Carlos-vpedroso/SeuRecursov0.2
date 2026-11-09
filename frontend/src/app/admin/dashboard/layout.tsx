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
      <Suspense fallback={<div>Carregando...</div>}>
        <div className="bg-fundo2 text-texto2 flex h-dvh min-h-0 w-full min-w-0 flex-col overflow-hidden lg:flex-row">
          <SidebarMenu />
          <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </Suspense>
    </DashboardProvider>
  );
}
