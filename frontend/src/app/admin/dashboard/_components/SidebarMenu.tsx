"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileWarning,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { AdminContext } from "@/context/AdminContext";
import { useAuth } from "@/hook/useAuth";

const mainNavigation = [
  {
    label: "Visão Geral",
    page: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Recurso",
    page: "Recurso",
    icon: FileText,
  },
  {
    label: "Multas",
    page: "Multas",
    icon: FileWarning,
  },
  {
    label: "Clientes",
    page: "Clientes",
    icon: Users,
  },
  {
    label: "Relatórios",
    page: "Relatorios",
    icon: BarChart3,
  },
];

const secondaryNavigation = [
  {
    label: "Configurações",
    page: "Configuracoes",
    icon: Settings,
  },
  {
    label: "Ajuda",
    page: "Ajuda",
    icon: HelpCircle,
  },
];

export default function SidebarMenu() {
  const { admin, logout } = useAuth(AdminContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const currentPage = searchParams.get("Page") ?? "Dashboard";

  const handleNavigation = (page: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === "Dashboard") {
      params.delete("Page");
    } else {
      params.set("Page", page);
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);

    setOpen(false);
  };

  const isActive = (page: string) => {
    return currentPage === page;
  };

  return (
    <div className="flex h-auto">
      {/* Mobile Header */}
      <header className="bg-fundo text-texto flex h-16 w-full items-center justify-between border-b px-4 shadow-md lg:hidden">
        <button
          onClick={() => handleNavigation("Dashboard")}
          className="flex items-center gap-2"
        >
          <div className="flex h-12 w-12">
            <Image
              src="/Logo_Derruba.png"
              alt="Logo"
              width={100}
              height={100}
              className="translate-y-0.5 scale-150"
            />
          </div>

          <span className="font-title font-semibold tracking-tight">
            Derruba Multa
          </span>
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Overlay Mobile */}
      {open && (
        <button
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-full w-[260px] shrink-0 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:z-50 max-lg:transition-transform max-lg:duration-300 lg:relative lg:translate-x-0 ${
          open ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        } `}
      >
        <div className="bg-fundo text-texto flex h-full flex-col border-r border-white/10">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-white/10 px-6">
            <button
              onClick={() => handleNavigation("Dashboard")}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20">
                <Image
                  src="/Logo_Derruba.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="translate-y-0.5 scale-120"
                />
              </div>

              <div>
                <h1 className="font-title text-md font-bold tracking-tight lg:text-lg">
                  Derruba Multa
                </h1>

                <p className="text-[8px] tracking-[0.2em] text-zinc-500 uppercase">
                  Dashboard
                </p>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Principal */}
            <div>
              <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.2em] text-zinc-600 uppercase">
                Principal
              </p>

              <nav className="space-y-1">
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.page);

                  return (
                    <button
                      key={item.page}
                      onClick={() => handleNavigation(item.page)}
                      className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                        active
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                      } `}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] transition-colors ${
                          active
                            ? "text-blue-500"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        } `}
                      />

                      <span>{item.label}</span>

                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sistema */}
            <div className="mt-8">
              <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.2em] text-zinc-600 uppercase">
                Sistema
              </p>

              <nav className="space-y-1">
                {secondaryNavigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.page);

                  return (
                    <button
                      key={item.page}
                      onClick={() => handleNavigation(item.page)}
                      className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                        active
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                      } `}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] ${
                          active
                            ? "text-blue-500"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        } `}
                      />

                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* User */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-xl p-2 transition select-none">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold">
                {admin?.name
                  .split(" ")
                  .slice(0, 2)
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase() || ""}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {admin?.name || "Usuário"}
                </p>

                <p className="truncate text-xs text-zinc-500">Administrador</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-[18px] w-[18px]" />

              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
