import { AdminProvider } from "@/context/AdminContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminProvider>{children}</AdminProvider>;
}
