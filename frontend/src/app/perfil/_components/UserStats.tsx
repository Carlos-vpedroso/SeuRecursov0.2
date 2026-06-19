import { BanknoteArrowUp, Calendar, DollarSign, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface UserStatsProps {
  userStats: {
    totalRecursos: number;
    totalInvestido: string;
    totalEconomizado: string;
    ultimaCompra: string;
  };
}

export default function UserStats({ userStats }: UserStatsProps) {
  const stats = [
    {
      label: "Recursos Totais",
      value: userStats.totalRecursos,
      icon: FileText,
      color: "text-cor1",
      bg: "bg-cor1/10",
      border: "border-cor1/20",
    },
    {
      label: "Total Investido",
      value: formatCurrency(userStats.totalInvestido),
      icon: BanknoteArrowUp,
      color: "text-lime-400",
      bg: "bg-lime-400/10",
      border: "border-lime-400/20",
    },
    {
      label: "Total Economizado",
      value: formatCurrency(userStats.totalEconomizado),
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
    {
      label: "Última Compra",
      value: userStats.ultimaCompra,
      icon: Calendar,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={`${stat.bg} ${stat.border} flex flex-col gap-3 rounded-2xl border p-5`}
          >
            <Icon className={`${stat.color} h-6 w-6`} />

            <div>
              <p className="text-texto2 text-3xl font-bold">{stat.value}</p>
              <p className="text-texto2/50 mt-0.5 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
