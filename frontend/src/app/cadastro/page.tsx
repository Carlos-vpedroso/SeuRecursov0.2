"use client";
import Image from "next/image";
import logoSeuRecurso from "../../../public/LogoSeuRecurso2.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/services/user.service";

interface FormData {
  email: string;
  confirmEmail: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      confirmEmail: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: FormData) => {
    const { email, confirmEmail, password, confirmPassword, username } = values;

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
      userService.registerLocal({ nome: username, email, password })
      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium">Nome Completo</label>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              {...register("username", { required: "Nome é obrigatório" })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="Digite seu email"
              {...register("email", { required: "Email é obrigatório" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Confirmar Email */}
          <div>
            <label className="block text-sm font-medium">Confirmar Email</label>
            <Input
              type="email"
              placeholder="Confirme o email"
              {...register("confirmEmail", {
                required: "Confirmação de email é obrigatória",
              })}
            />
            {errors.confirmEmail && (
              <p className="text-red-500 text-xs">
                {errors.confirmEmail.message}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <div className="flex">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "Mínimo de 8 caracteres",
                  },
                })}
              />
              <Button
                type="button"
                className="mx-2 bg-azul text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-sm font-medium">Confirmar Senha</label>
            <div className="flex">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                {...register("confirmPassword", {
                  required: "Confirmação de senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "Mínimo de 8 caracteres",
                  },
                })}
              />
              <Button
                type="button"
                className="mx-2 bg-azul text-white"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              type="submit"
              className="bg-azul text-white font-bold"
              disabled={!isValid}
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
      </div>
    </section>
  );
};

export default Cadastro;