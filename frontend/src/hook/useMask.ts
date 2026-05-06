import {
    maskCEP,
    maskCPF,
    maskPhone,
    maskRG
} from "@/lib/masks";
import { useCallback } from "react";

export function useMask() {
    const cpf = useCallback(maskCPF, []);
    const phone = useCallback(maskPhone, []);
    const cep = useCallback(maskCEP, []);
    const rg = useCallback(maskRG, []);

    return { cpf, cep, phone, rg };
}