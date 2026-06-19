import { useContext, Context } from "react";

/**
 * Hook genérico para consumir qualquer context de autenticação.
 * @param authContext Contexto que será consumido (ex: UserContext, RestaurantContext)
 * @returns Valor do context
 */
export function useAuth<T>(
    authContext: Context<T | undefined>
): T {
    const context = useContext(authContext);

    if (context === undefined) {
        throw new Error(
            "useAuth deve ser usado dentro de um AuthProvider correspondente"
        );
    }

    return context;
}