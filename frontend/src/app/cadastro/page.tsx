"use client";
import Image from "next/image"
import logoSeuRecurso from '../../../public/LogoSeuRecurso2.jpg'
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from 'sonner';


interface FormData {
    email: string;
    confirmEmail: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const Cadastro = () => {

    const form = useForm<FormData>({
        defaultValues: {
            email: "",
            confirmEmail: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (values: FormData) => {
        const { email, confirmEmail, password, confirmPassword, username } = values;

        // Validação manual
        if (email !== confirmEmail) {
            toast.error("Os emails não coincidem.");
            return;
        }

        if (password.length < 8) {
            toast.error("A senha deve conter pelo menos 8 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem.");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registros`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    useremail: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const erro = await response.text();
                toast.error(`Erro ao cadastrar: ${erro}`);
                return;
            }

            const data = await response.json();
            toast.success("Cadastro realizado com sucesso!");
            console.log(data);
            router.push('/login')

        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error("Ocorreu um erro ao se conectar com o servidor.");
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
                <div className="text-center">
                    <Image
                        src={logoSeuRecurso}
                        alt="Logo SeuRecurso"
                        height={150}
                        width={150}
                        className="mx-auto h-auto w-auto"
                        priority
                    />
                    <h1 className="font-bold text-2xl mt-4">Bem-vindo ao Seu Recurso</h1>
                    <p className="text-gray-500 text-sm">Entre com seus dados ou registre-se</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                        {/* Campo Username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu nome completo" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Campo Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirmar o Email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Campo Senha */}
                        <FormField
                            control={form.control}
                            name="password"
                            rules={{
                                required: "Senha é obrigatória",
                                minLength: {
                                    value: 8,
                                    message: "A senha deve ter no mínimo 8 caracteres",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <div className="flex">
                                            <Input
                                                placeholder="Digite sua senha"
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                            />
                                            <Button
                                                className="mx-2 bg-azul text-white"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (<EyeClosed />) : (<Eye />)}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            rules={{
                                required: "Senha é obrigatória",
                                minLength: {
                                    value: 8,
                                    message: "A senha deve ter no mínimo 8 caracteres",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Senha</FormLabel>
                                    <FormControl>
                                        <div className="flex">
                                            <Input
                                                placeholder="Confirme sua senha"
                                                type={showConfirmPassword ? "text" : "password"}
                                                {...field}
                                            />
                                            <Button
                                                className="mx-2 bg-azul text-white"
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (<EyeClosed />) : (<Eye />)}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between items-center pt-2">
                            <Button
                                type="submit"
                                className="bg-azul text-white font-bold"
                                disabled={!form.formState.isValid}
                            >
                                Cadastrar-se
                            </Button>
                            <Link
                                href="/login"
                                className="text-azul font-semibold text-sm hover:underline"
                            >
                                Já tenho uma conta
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    )
}

export default Cadastro