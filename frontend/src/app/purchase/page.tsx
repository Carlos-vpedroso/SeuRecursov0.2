// app/purchase/page.tsx
import { Suspense } from "react";
import Purchase from "./PurchaseClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center p-10">Carregando...</p>}>
      <Purchase />
    </Suspense>
  );
}
