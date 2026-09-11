import {
    maskCEP,
    maskCPF,
    maskPhone,
    maskPlate,
    maskRG
} from "@/lib/masks";
import { useCallback } from "react";

export function useMask() {
    const cpf = useCallback(maskCPF, []);
    const phone = useCallback(maskPhone, []);
    const cep = useCallback(maskCEP, []);
    const rg = useCallback(maskRG, []);
    const plate = useCallback(maskPlate, [])

    return { cpf, cep, phone, rg, plate };
}