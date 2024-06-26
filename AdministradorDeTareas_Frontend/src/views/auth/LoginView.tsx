import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Iniciando Sesión...");
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-4xl font-black text-gray-300">Iniciar sesión</h1>
      <p className="text-2xl font-light text-white mt-3">
        Comienza a planear tus proyectos {""}
        <span className=" text-amber-600 font-bold">
          {" "}
          iniciando sesión en este formulario
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-gray-900 shadow-2xl mt-6 rounded-xl"
        noValidate
      >
        <div className="flex flex-col gap-3 text-black">
          <label className="font-normal text-white text-xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border rounded-lg"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-3 text-black">
          <label className="font-normal text-white text-xl">Contraseña</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border rounded-lg"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-gray-800 hover:bg-black w-full p-3 border-none  text-white font-black rounded-lg  text-xl cursor-pointer"
        />

        <nav className=" flex flex-col ">
          <Link
            to={"/auth/register"}
            className="text-center text-gray-300 font-normal text-[18px] hover:text-amber-600 "
          >
            ¿No tienes cuenta? Registrate aquí.
          </Link>
          <Link
            to={"/auth/forgot-password"}
            className="text-center mt-4 text-gray-300 font-normal text-[18px] hover:text-amber-600 "
          >
            ¿Olvidaste tu contraseña? Reestablecer.
          </Link>
        </nav>
      </form>
    </>
  );
}
