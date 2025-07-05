"use client";
import Image from "next/image";
import logoSeuRecurso from "../../../public/LogoSeuRecurso2.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { SignIn } = useAuth();

  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginForm) => {
    SignIn(values.email, values.password);
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

            {/* Campo Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center pt-2">
              <Button type="submit" className="bg-azul text-white font-bold">
                Entrar
              </Button>
              <Link
                href="/cadastro"
                className="text-azul font-semibold text-sm hover:underline"
              >
                Criar nova conta
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
