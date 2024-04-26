import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
      <h1
        className="text-4xl 
       font-black text-gray-300"
      >
        Confirma tu Cuenta
      </h1>
      <p className="text-2xl font-light text-white mt-2 ">
        Ingresa el código que recibiste {""}
        <span className=" text-amber-600 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-6 bg-gray-900 rounded-3xl mt-10">
        <label className="font-normal text-white  text-2xl text-center  block">
          Código de 6 dígitos
        </label>

        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-400 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-400 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-400 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-400 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-400 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-400 border placeholder-white" />
          </PinInput>
        </div>
        <nav className="mt-8 flex flex-col space-y-4">
          <Link
            to="/auth/request-code"
            className="text-center text-white hover:text-amber-600 font-normal"
          >
            Solicitar un nuevo Código
          </Link>
        </nav>
      </form>
    </>
  );
}
