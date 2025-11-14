import React from "react";
import { useState } from "react";
import { AuthHooks } from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";


export function Login() {
  const [ email, setEmail ] = useState(""); 
  const [ password, setPassword ] = useState(""); 
  const [ message, setMessage ] = useState("");
  
  const navigator = useNavigate();
  
  const user = new AuthHooks();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const dataUser = await user.Login(email, password);

      if (dataUser.success) {
        setMessage("Login feito com sucesso!")
        setTimeout(() => {
          navigator("/");
        }, 1000);
      }

      console.log("Login feito")

    } catch (error) {
      console.log("Erro login", error);
      setMessage(`erro ao logar, tente novamente!`);
      return;
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h3 className="absolute top-[18%] left-[38%] hover:bg-black-500 items-center gap-2 text-sm text-muted-foreground transition-colors mb-4">
            <a href="/">Voltar para a Home</a>
        </h3>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Entrar
        </h2>

        <form className="space-y-5" method="POST" onSubmit={handleOnSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value) }
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
              onChange={(e) => setPassword(e.target.value) }
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            
            <a href="#" className="text-blue-600 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        { message && (
            <p className={`mt-2  ${ message ? "text-green-600" : "text-red-600"  }`}>
                {message}
            </p>
        ) }

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
