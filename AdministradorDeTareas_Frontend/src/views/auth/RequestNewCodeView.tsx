import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { RequestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const { mutate } = useMutation({
    mutationFn: RequestConfirmationCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
    mutate(formData);

  return (
    <>
      <h1 className="text-4xl font-black text-gray-300">
        Solicitar Código de Confirmación
      </h1>
      <p className="text-2xl font-light text-white mt-4">
        Coloca tu e-mail para recibir {""}
        <span className=" text-amber-600 font-bold"> un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-lg bg-gray-900 mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-white text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Enviar Código"
          className="bg-gray-800 hover:bg-black w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-4 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 hover:text-amber-600 font-normal"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-300 hover:text-amber-600  font-normal"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
