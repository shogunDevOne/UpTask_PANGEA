import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setValidToken] = useState(false);

  return (
    <>
      <h1 className="text-4xl font-black text-gray-300">
        Reestablecer contraseña
      </h1>
      <p className="text-2xl font-light text-white mt-3">
        Ingresa el codigo que recibiste {""}
        <span className=" text-amber-600 font-bold"> en tu correo</span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setValidToken={setValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
