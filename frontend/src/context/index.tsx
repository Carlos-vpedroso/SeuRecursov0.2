'use client'

import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { AuthContextType, Multa, DadosFormulario } from "@/types";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [multas, setMultas] = useState<Multa[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null)
    const router = useRouter();
    const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({
        artigoMulta: '',
        codigoMulta: '',
        valorMulta: 0,
        valorRecurso: 0,
        descricao: '',
        tipoMulta: '',
        tipoDefesa: '',
        fato: '',
        fatoComentario: '',
        notificado: '',
        tempoNotificacao: '',
        agente: '',
        acessoAuto: '',
        patio: '',
        patioComentario: ''
    });

    const fetchMultas = async () => {
        try {
            setLoading(true);
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/multas`);
            const data = await resp.json();
            setMultas(data);
            setErro(null);
        } catch (e) {
            console.error(e)
            setErro("Erro ao buscar multas.");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchMultas();
        const token = Cookies.get("token");
        if (token) {
            const email = Cookies.get("email");
            setUser(email ?? null);
        }
    }, []);

    async function SignIn(email: string, password: string) {
        try {
            if (!email || !password) {
                alert("Preencha todos os campos");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ useremail: email, password }),
            });

            const data = await response.json();

            if (!response.ok || !data.token) {
                alert("Erro ao fazer login");
                return;
            }

            Cookies.set("token", data.token, {
                expires: 1,
                sameSite: 'Strict',
                path: '/',
            })
            Cookies.set("email", data.email, { expires: 1, sameSite: 'Strict' });

            setUser(data.email);
            router.push("/");
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro ao conectar com o servidor.");
        }
    }

    function SignOut() {
        setUser(null);
        Cookies.remove("token");
        Cookies.remove("email");
        router.push("/login");
    }

    return <AuthContext.Provider
        value={{
            user,
            signed: !!user,
            SignIn,
            SignOut,
            dadosFormulario,
            setDadosFormulario,
            multas,
            loading,
            erro
        }}
    >
        {children}
    </AuthContext.Provider>

}

export default AuthProvider;

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}