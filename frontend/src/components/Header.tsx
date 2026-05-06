"use client"
import Image from "next/image"
import logo from "../../public/LogoSeuRecurso.jpg"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { UserContext } from "@/context/UserContext"
import { useAuth } from "@/hook/useAuth"

const Header = () => {

    const { user, SignOut } = useAuth(UserContext);

    return (
        <div className="flex p-4 items-center justify-between md:justify-around bg-white">
            <Link
                className="text-azul tracking-widest text-xl font-medium hidden md:flex"
                href="/"
            >
                SEU RECURSO
            </Link>
            <Link href="/">
                <Image
                    src={logo}
                    height={50}
                    width={50}
                    alt="Logo Seu Recurso"
                    className="md:hidden h-auto w-auto"
                    priority
                />

            </Link>
            {user === null &&
                <Link
                    className="bg-azul rounded-md px-3 py-1 text-white font-semibold"
                    href={user ? '/perfil' : '/login'}
                >
                    Área do Cliente
                </Link>
            }
            {user &&
                <div className="flex items-center">
                    <Link
                        href="/perfil"
                        className="shadow-sm rounded-md bg-gray-200 px-2 py-1 mr-2 cursor-pointer hover:bg-gray-400 transition duration-300">
                        <UserRound className="text-azul w-7 h-7" />
                    </Link>
                    <button className="font-semibold text-red-500 cursor-pointer hover:underline transition duration-300 " onClick={() => SignOut()}>Sair</button>
                </div>
            }
        </div>
    )
}

export default Header