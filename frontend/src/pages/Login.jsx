import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthHooks.jsx";
import { useNavigate } from "react-router-dom";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const data = await login(email, password);

      if (data.success) {
        setType("success");
        setMessage("Login feito com sucesso!");

        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setType("error");
        setMessage(data.message || "Credenciais inválidas");
      }

    } catch (error) {
      setType("error");
      setMessage(error.message || "Erro ao logar.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <h3 className="absolute top-[18%] left-[38%] items-center gap-2 text-sm text-muted-foreground mb-4">
        <a href="/">Voltar para a Home</a>
      </h3>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Entrar
        </h2>

        <form className="space-y-5" onSubmit={handleOnSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {message && (
          <p className={`mt-2 ${type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Não tem uma conta?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Registrar-se
          </a>
        </p>
      </div>
    </div>
  );
}
