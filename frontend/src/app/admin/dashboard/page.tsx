import Multas from "./_components/MultasDashboard";
import Working from "./_components/Working";

type PageProps = {
  searchParams: Promise<{
    Page?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = params.Page ?? "Dashboard";

  switch (page) {
    case "Multas":
      return <Multas />;

    case "Clientes":
      return <Working />;

    case "Relatorios":
      return <Working />;

    case "Configuracoes":
      return <Working />;

    case "Ajuda":
      return <Working />;

    case "Dashboard":
    default:
      return <Working />;
  }
}
