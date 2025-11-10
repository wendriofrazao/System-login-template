import React from "react";

export function ResetPassword() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Resetar Senha
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Insira sua nova senha abaixo.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Nova Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              placeholder="Confirme sua nova senha"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Redefinir Senha
          </button>
        </form>
      </div>

      <footer className="mt-10 text-gray-400 text-sm text-center">
        © 2025 MyWebsite. Todos os direitos reservados.
      </footer>
    </div>
  );
}
