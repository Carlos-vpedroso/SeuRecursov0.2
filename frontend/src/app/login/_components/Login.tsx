"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

interface LoginProps {
    callbackUrl: string
}

const Login = ({ callbackUrl }: LoginProps) => {


    const handleGoogleLogin = async () => {
        await signIn("google", {
            callbackUrl,
        });
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-fundo2 px-4">
            <div className="w-full max-w-md bg-fundo rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center">
                    <Image
                        src="/Logo_Derruba.png"
                        alt="Derruba Multa"
                        width={180}
                        height={180}
                        priority
                        className="mb-6 scale-150"
                    />

                    <h1 className="text-2xl font-bold text-center text-texto font-title">
                        Acesse sua conta
                    </h1>

                    <p className="text-center text-texto/60 mt-2 mb-8">
                        Faça login para acompanhar seus recursos e documentos.
                    </p>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 rounded-lg  bg-white px-4 py-3 font-medium text-texto2 transition hover:bg-gray-100 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="24"
                            height="24"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.196 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                            />
                            <path
                                fill="#FF3D00"
                                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.277 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24 44c5.176 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.146 35.091 26.673 36 24 36c-5.175 0-9.625-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 01-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                            />
                        </svg>
                        Entrar com Google
                    </button>

                </div>
            </div>
        </main>
    );
};

export default Login;