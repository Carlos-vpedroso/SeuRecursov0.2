"use client";
import Image from "next/image";
import logoSeuRecurso from "../../../public/LogoSeuRecurso2.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hook/useAuth";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { SignIn } = useAuth(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    const result = await SignIn(values.email, values.password);

    if (result.success) {
      window.location.href = "/"; // redireciona para home
    } else {
      toast.error(result.message); // ou mostrar toast/erro
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          {/* Email */}
          <div>
            <Label className="block text-sm font-medium">Email</Label>
            <Input
              type="email"
              placeholder="Digite seu email"
              {...register("email", { required: "Email é obrigatório" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <Label className="block text-sm font-medium">Senha</Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              {...register("password", { required: "Senha é obrigatória" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

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
      </div>
    </section>
  );
};

export default Login;