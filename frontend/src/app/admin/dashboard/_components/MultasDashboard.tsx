"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdminContext } from "@/context/AdminContext";
import { DashboardContext } from "@/context/DashboardContext";
import { useAuth } from "@/hook/useAuth";
import { formatCurrency } from "@/lib/utils";
import { multaService } from "@/services/multa.service";
import { Multa, TipoMulta } from "@/types";
import {
  Search,
  Filter,
  Pencil,
  Trash2,
  X,
  Plus,
  LoaderCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const tipoMultaLabel: Record<TipoMulta, string> = {
  LEVE: "Leve",
  MEDIA: "Média",
  GRAVE: "Grave",
  GRAVISSIMA: "Gravíssima",
};

const tipoMultaStyle: Record<TipoMulta, string> = {
  LEVE: "bg-emerald-500/10 text-emerald-400",
  MEDIA: "bg-yellow-500/10 text-yellow-400",
  GRAVE: "bg-orange-500/10 text-orange-400",
  GRAVISSIMA: "bg-red-500/10 text-red-400",
};

const MultasDashboard = () => {
  const { multas, setMultas } = useAuth(DashboardContext);
  const { accessToken } = useAuth(AdminContext);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState<TipoMulta | "TODAS">("TODAS");

  const filteredMultas = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return multas.filter((multa: Multa) => {
      const matchesSearch =
        multa.codigo_multa.toLowerCase().includes(normalizedSearch) ||
        multa.artigo_multa.toLowerCase().includes(normalizedSearch) ||
        multa.descricao.toLowerCase().includes(normalizedSearch);

      const matchesTipo = tipo === "TODAS" || multa.tipo_multa === tipo;

      return matchesSearch && matchesTipo;
    });
  }, [multas, search, tipo]);

  const clearFilters = () => {
    setSearch("");
    setTipo("TODAS");
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMulta, setSelectedMulta] = useState<Multa>({
    id: "",
    codigo_multa: "",
    artigo_multa: "",
    tipo_multa: "LEVE" as TipoMulta,
    descricao: "",
    valor_multa: "",
    valor_recurso: "",
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [multaToDelete, setMultaToDelete] = useState<Multa | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEdit = (multa: Multa) => {
    setSelectedMulta(multa);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedMulta || !accessToken) return;
    setLoading(true);

    try {
      const payload = {
        codigo_multa: selectedMulta.codigo_multa,
        artigo_multa: selectedMulta.artigo_multa,
        tipo_multa: selectedMulta.tipo_multa,
        descricao: selectedMulta.descricao,
        valor_multa: selectedMulta.valor_multa,
        valor_recurso: selectedMulta.valor_recurso,
      };

      const result = await multaService.update(
        selectedMulta.id,
        payload,
        accessToken,
      );
      if (result.success && result.data) {
        setIsEditDialogOpen(false);
        setSelectedMulta({
          id: "",
          codigo_multa: "",
          artigo_multa: "",
          tipo_multa: "LEVE" as TipoMulta,
          descricao: "",
          valor_multa: "",
          valor_recurso: "",
        });
        // atualizar multas no contexto aqui
        setMultas((prev) =>
          prev.map((multa) =>
            multa.id === result.data?.id ? result.data : multa,
          ),
        );
        toast.success("Multa atualizada com sucesso!");
        return;
      }
      toast.error(result.error || "Erro ao atualizar a multa!");
    } catch (error) {
      console.error("Erro ao atualizar multa:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (multa: Multa) => {
    setMultaToDelete(multa);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!multaToDelete || !accessToken) return;

    setDeleteLoading(true);

    try {
      const result = await multaService.delete(multaToDelete.id, accessToken);

      if (result.success) {
        setMultas((prev) =>
          prev.filter((multa) => multa.id !== multaToDelete.id),
        );

        setIsDeleteDialogOpen(false);
        setMultaToDelete(null);

        toast.success("Multa excluída com sucesso!");

        return;
      }

      toast.error(result.error || "Erro ao excluir a multa!");
    } catch (error) {
      console.error("Erro ao excluir multa:", error);

      toast.error("Erro inesperado ao excluir a multa!");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="flex max-h-screen min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-4 py-6">
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="flex shrink-0 flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <h1 className="font-title text-texto2 text-2xl font-semibold">
            Edição de Multas
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Gerencie as multas cadastradas no sistema.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Nova multa
        </button>
      </div>

      {/* ========================================================= */}
      {/* FILTERS */}
      {/* ========================================================= */}

      <section className="mt-6 shrink-0 rounded-2xl p-5">
        <div className="mb-5 flex items-center gap-2">
          <Filter className="h-4 w-4 shrink-0 text-blue-500" />

          <h2 className="text-texto2 text-sm font-semibold">Filtros</h2>
        </div>

        <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto]">
          {/* Search */}
          <div className="focus-within:ring-cor1 bg-card flex w-full items-center overflow-hidden rounded-2xl border transition-all duration-300 focus-within:ring-1">
            <div className="text-cor1 pointer-events-none ml-4">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por código, artigo ou descrição..."
              className="text-texto2 placeholder:text-texto2/50 h-11 w-full bg-transparent px-4 outline-none"
            />
          </div>

          {/* Type */}
          <Select
            value={tipo}
            onValueChange={(value) => setTipo(value as TipoMulta | "TODAS")}
          >
            <SelectTrigger className="text-texto2 bg-card h-11 min-h-11 w-full cursor-pointer rounded-xl border-black/10 text-sm">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>

            <SelectContent className="bg-fundo2 border-white/10 text-zinc-400">
              <SelectItem
                value="TODAS"
                className="cursor-pointer focus:bg-transparent focus:text-white"
              >
                Todos os tipos
              </SelectItem>

              <SelectItem
                value="LEVE"
                className="cursor-pointer focus:bg-transparent focus:text-white"
              >
                Leve
              </SelectItem>

              <SelectItem
                value="MEDIA"
                className="cursor-pointer focus:bg-transparent focus:text-white"
              >
                Média
              </SelectItem>

              <SelectItem
                value="GRAVE"
                className="cursor-pointer focus:bg-transparent focus:text-white"
              >
                Grave
              </SelectItem>

              <SelectItem
                value="GRAVISSIMA"
                className="cursor-pointer focus:bg-transparent focus:text-white"
              >
                Gravíssima
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Clear */}
          <button
            type="button"
            onClick={clearFilters}
            className="flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-zinc-400 transition hover:border-red-500/20 hover:text-red-500"
          >
            <X className="h-4 w-4" />
            Limpar
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TABLE CONTAINER */}
      {/* ========================================================= */}

      <section className="mt-5 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-black/10">
        {/* Table Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-texto2 text-sm font-semibold">
              Multas cadastradas
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              {filteredMultas.length}{" "}
              {filteredMultas.length === 1
                ? "multa encontrada"
                : "multas encontradas"}
            </p>
          </div>
        </div>

        {/* ======================================================= */}
        {/* TABLE SCROLL AREA */}
        {/* ======================================================= */}

        <div className="min-h-0 min-w-0 flex-1 overflow-auto">
          <table className="w-full min-w-[850px] table-fixed border-collapse text-left">
            {/* =================================================== */}
            {/* TABLE HEAD */}
            {/* =================================================== */}

            <thead className="sticky top-0 z-10">
              <tr className="bg-fundo2 border-b border-white/10">
                {/* Código */}
                <th className="hidden w-[100px] px-3 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase lg:table-cell">
                  Código
                </th>

                {/* Artigo */}
                <th className="hidden w-[90px] px-3 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase lg:table-cell">
                  Artigo
                </th>

                {/* Tipo */}
                <th className="hidden w-[125px] px-3 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase lg:table-cell">
                  Tipo
                </th>

                {/* Descrição */}
                <th className="w-auto px-3 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  Descrição
                </th>

                {/* Valor */}
                <th className="w-[120px] px-3 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  Valor
                </th>

                {/* Recurso */}
                <th className="w-[120px] px-3 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  Recurso
                </th>

                {/* Ações */}
                <th className="w-[95px] px-3 py-3 text-right text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>

            {/* =================================================== */}
            {/* TABLE BODY */}
            {/* =================================================== */}

            <tbody className="divide-y divide-white/5">
              {filteredMultas.length > 0 ? (
                filteredMultas.map((multa: Multa) => (
                  <tr
                    key={multa.id}
                    className="group transition-colors hover:bg-white/[0.025]"
                  >
                    {/* Código */}
                    <td className="hidden px-3 py-4 lg:table-cell">
                      <span className="text-texto2 block truncate font-mono text-sm font-medium">
                        {multa.codigo_multa}
                      </span>
                    </td>

                    {/* Artigo */}
                    <td className="hidden px-3 py-4 lg:table-cell">
                      <span className="text-texto2 block truncate text-sm">
                        {multa.artigo_multa}
                      </span>
                    </td>

                    {/* Tipo */}
                    <td className="hidden px-3 py-4 lg:table-cell">
                      <span
                        className={`inline-flex max-w-full items-center truncate rounded-lg px-2.5 py-1 text-xs font-medium ${
                          tipoMultaStyle[multa.tipo_multa]
                        }`}
                      >
                        {tipoMultaLabel[multa.tipo_multa]}
                      </span>
                    </td>

                    {/* Descrição */}
                    <td className="min-w-0 px-3 py-4">
                      <p
                        className="truncate text-sm text-zinc-400"
                        title={multa.descricao}
                      >
                        {multa.descricao}
                      </p>
                    </td>

                    {/* Valor */}
                    <td className="px-3 py-4">
                      <span className="text-texto2 text-sm font-medium whitespace-nowrap">
                        {formatCurrency(multa.valor_multa)}
                      </span>
                    </td>

                    {/* Recurso */}
                    <td className="px-3 py-4">
                      <span className="text-sm whitespace-nowrap text-zinc-400">
                        {formatCurrency(multa.valor_recurso)}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(multa)}
                          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                          title="Editar multa"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(multa)}
                          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                          title="Excluir multa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
                        <Search className="h-5 w-5 text-zinc-500" />
                      </div>

                      <p className="text-texto2 text-sm font-medium">
                        Nenhuma multa encontrada
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Tente alterar os filtros ou realizar uma nova busca.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-fundo2 text-texto2 border-white/10 lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar multa</DialogTitle>

            <DialogDescription className="text-zinc-500">
              Altere os dados da multa cadastrada no sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            {/* Código + Artigo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo_multa">Código da multa</Label>

                <Input
                  id="codigo_multa"
                  value={selectedMulta.codigo_multa}
                  onChange={(event) =>
                    setSelectedMulta((prev) => ({
                      ...prev,
                      codigo_multa: event.target.value,
                    }))
                  }
                  className="bg-card border-black/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artigo_multa">Artigo</Label>

                <Input
                  id="artigo_multa"
                  value={selectedMulta.artigo_multa}
                  onChange={(event) =>
                    setSelectedMulta((prev) => ({
                      ...prev,
                      artigo_multa: event.target.value,
                    }))
                  }
                  className="bg-card border-black/10"
                />
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label>Tipo da multa</Label>

              <Select
                value={selectedMulta.tipo_multa}
                onValueChange={(value) =>
                  setSelectedMulta((prev) => ({
                    ...prev,
                    tipo_multa: value as TipoMulta,
                  }))
                }
              >
                <SelectTrigger className="bg-card w-full border-black/10">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="bg-fundo2 border-white/10">
                  <SelectItem value="LEVE">Leve</SelectItem>

                  <SelectItem value="MEDIA">Média</SelectItem>

                  <SelectItem value="GRAVE">Grave</SelectItem>

                  <SelectItem value="GRAVISSIMA">Gravíssima</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>

              <Textarea
                id="descricao"
                value={selectedMulta.descricao}
                onChange={(event) =>
                  setSelectedMulta((prev) => ({
                    ...prev,
                    descricao: event.target.value,
                  }))
                }
                className="bg-card min-h-[100px] resize-none border-black/10"
              />
            </div>

            {/* Valores */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor_multa">Valor da multa</Label>

                <Input
                  id="valor_multa"
                  type="number"
                  step="0.01"
                  min="0"
                  value={selectedMulta.valor_multa}
                  onChange={(event) =>
                    setSelectedMulta((prev) => ({
                      ...prev,
                      valor_multa: event.target.value,
                    }))
                  }
                  className="bg-card border-black/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor_recurso">Valor do recurso</Label>

                <Input
                  id="valor_recurso"
                  type="number"
                  step="0.01"
                  min="0"
                  value={selectedMulta.valor_recurso}
                  onChange={(event) =>
                    setSelectedMulta((prev) => ({
                      ...prev,
                      valor_recurso: event.target.value,
                    }))
                  }
                  className="bg-card border-black/10"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => setIsEditDialogOpen(false)}
              className="w-full cursor-pointer rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:text-red-400"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Salvar alterações</span>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!deleteLoading) {
            setIsDeleteDialogOpen(open);

            if (!open) {
              setMultaToDelete(null);
            }
          }
        }}
      >
        <DialogContent className="bg-fundo2 text-texto2 border-white/10 sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Excluir multa</DialogTitle>

            <DialogDescription className="text-zinc-500">
              Tem certeza que deseja excluir esta multa? Essa ação não poderá
              ser desfeita.
            </DialogDescription>
          </DialogHeader>

          {multaToDelete && (
            <div className="rounded-xl border border-red-500/10 bg-red-500/[0.04] p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-zinc-500">Código</span>

                  <span className="text-texto2 font-mono text-sm font-medium">
                    {multaToDelete.codigo_multa}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-zinc-500">Artigo</span>

                  <span className="text-texto2 text-sm">
                    {multaToDelete.artigo_multa}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-zinc-500">Tipo</span>

                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      tipoMultaStyle[multaToDelete.tipo_multa]
                    }`}
                  >
                    {tipoMultaLabel[multaToDelete.tipo_multa]}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              disabled={deleteLoading}
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setMultaToDelete(null);
              }}
              className="hover:text-texto2 w-full cursor-pointer rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="button"
              disabled={deleteLoading}
              onClick={handleConfirmDelete}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleteLoading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Excluir multa
                </>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MultasDashboard;
