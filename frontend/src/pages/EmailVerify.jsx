import React, { useState } from "react";
import { AuthHooks } from "../hooks/AuthHooks";
import { useNavigate, useLocation } from "react-router-dom";

export function VerifyEmail() {

  const [code, setCode] = useState(["","","","","",""]);
  const [message, setMessage] = useState("");

  const userVerify = new AuthHooks();
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const otp = code.join("");

    try {
      const res = await userVerify.VerifyAccount(email, otp);

      if (!res.success) {
        setMessage(res.message || "Código inválido");
        return;
      }

      setMessage("Conta verificada com sucesso!");
      setTimeout(() => navigate("/"), 1000);

    } catch (error) {
      setMessage("Erro ao verificar conta");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center" >
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Verificação de E-mail</h1>
        <p className="text-gray-600 mb-6">Digite o código enviado para <b>{email}</b>.</p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                maxLength="1"
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button 
            type="submit" 
            className=" cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Verificar
          </button>
        </form>

        { message && (
          <p className="mt-4 text-green-600">{message}</p>
        )}

      </div>
    </div>
  );
}
