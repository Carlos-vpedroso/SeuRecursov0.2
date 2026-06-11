"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMask } from "@/hook/useMask";

interface FloatingInputProps {
    label: string;
    setState: (e: string) => void;
    value: string;
    mask?: "cpf" | "phone" | "rg" | "plate" | "cep";
    disabled?: boolean;
}

export function FloatingInput({
    label,
    setState,
    value,
    mask,
    disabled = false
}: FloatingInputProps) {
    const { rg, cpf, phone, plate, cep } = useMask();
    const [focused, setFocused] = useState(false);

    const active = focused || value.length > 0;

    const handleChange = (value: string) => {
        switch (mask) {
            case "cpf":
                setState(cpf(value));
                break;

            case "phone":
                setState(phone(value));
                break;

            case "rg":
                setState(rg(value));
                break;
            case "plate":
                setState(plate(value));
                break;
            case "cep":
                setState(cep(value));
                break;

            default:
                setState(value);
        }
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`
                    w-full
                    bg-transparent
                    border-0
                    border-b-2
                    border-border
                    outline-none
                    text-lg
                    py-1
                    ${disabled ? "cursor-not-allowed opacity-60" : ""}
                `}
            />

            <motion.label
                animate={{
                    y: active ? -22 : 0,
                    scale: active ? 0.85 : 1,
                    color: active ? "#62748e" : "#9ca3af",
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeOut",
                }}
                className={`absolute
          left-0
          top-2
          origin-left
          pointer-events-none
          ${disabled ? "opacity-60" : ""}
          `}
            >
                {label}
            </motion.label>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                    scaleX: active ? 1 : 0,
                }}
                transition={{
                    duration: 0.25,
                }}
                className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-full
          bg-slate-500
          origin-left
        "
            />
        </div>
    );
}