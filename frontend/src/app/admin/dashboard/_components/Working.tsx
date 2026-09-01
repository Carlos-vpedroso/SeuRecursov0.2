import { Settings } from "lucide-react";

const Working = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
          <Settings className="h-7 w-7 text-blue-500" />
        </div>

        <h1 className="font-title text-texto2 text-2xl font-semibold">
          Configurações em breve
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Estamos trabalhando nessa funcionalidade para oferecer uma experiência
          cada vez melhor. Em breve, as configurações estarão disponíveis por
          aqui.
        </p>
      </div>
    </div>
  );
};

export default Working;
