"use client";

import { createContext, ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";

interface UserContextType {
  user: any;
  session: any;
  accessToken?: string;
  userId?: string;
  status: "loading" | "authenticated" | "unauthenticated";
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const { data: session, status } = useSession();
  return (
    <UserContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        accessToken: session?.accessToken,
        userId: session?.user?.id,
        status,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserProvider = ({ children }: UserProviderProps) => {
  return (
    <SessionProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </SessionProvider>
  );
};
