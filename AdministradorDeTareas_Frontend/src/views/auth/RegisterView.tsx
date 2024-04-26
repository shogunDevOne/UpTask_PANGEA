import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  return (
    <>
      <h1 className="text-4xl font-black text-gray-300">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {""}
        <span className=" text-amber-600 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-gray-900 shadow-2xl mt-6 rounded-xl"
        noValidate
      >
        <div className="flex flex-col gap-3 text-black">
          <label className="font-normal text-xl text-white">Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border rounded-lg"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-3 text-black">
          <label className="font-normal text-xl text-white" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border rounded-lg"
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

        <div className="flex flex-col gap-3 text-black">
          <label className="font-normal text-xl text-white">Contraseña</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border rounded-lg"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-3 text-black">
          <label className="font-normal text-xl text-white">
            Repetir Contraseña
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border rounded-lg"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="bg-gray-800 hover:bg-black w-full p-3  text-white font-black rounded-lg  text-xl cursor-pointer"
        />

        <nav className=" flex flex-col ">
          <Link
            to={"/auth/login"}
            className="text-center text-gray-300 font-normal text-[18px] hover:text-amber-600 "
          >
            ¿Ya tienes cuenta? Iniciar sesión.
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
