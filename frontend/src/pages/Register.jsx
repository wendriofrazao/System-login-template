import React from "react";
import { useState } from "react";
import { AuthHooks } from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
import { VerifyEmail } from "./EmailVerify";

export function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [message, setMessage] = useState("");
    const navigator = useNavigate();

    const User = new AuthHooks();

    const handleSubmit = async (event) => {

        event.preventDefault();

    try {
        const datas = await User.Registration(name, email, password, confirmpassword);

        if (datas.success) {
            setMessage("Conta criada com sucesso!");
            setTimeout(() => {
                navigator(`/email-verify?email=${email}`);
            }, 1000);
        } else {
            setMessage(datas.message || "Erro desconhecido");
        }

        const sendOtp = await User.SendOtp(email);
        
        if (sendOtp?.success) {
          console.log("Otp enviado no email");
        } 

    } catch (error) {
        console.error("Erro no registro:", error);
        setMessage("Falha na conexão ou erro no servidor");
      }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <h3 className="absolute top-[9%] left-[38%] hover:bg-black-500 items-center gap-2 text-sm text-muted-foreground transition-colors mb-4">
            <a href="/">Voltar para a Home</a>
        </h3>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Criar Conta
        </h2>

        <form className="space-y-5" method="POST" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <input
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Repita a senha"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Registrar
          </button>
        </form>

        { message && (
            <p className={`mt-2  ${ message ? "text-green-600" : "text-red-600"  }`}>
                {message}
            </p>
        ) }

        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
