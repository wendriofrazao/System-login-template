import React from "react";

export function VerifyEmail() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Verificação de E-mail
        </h1>
        <p className="text-gray-600 mb-6">
          Digite o código de <span className="font-semibold">6 dígitos</span> que enviamos para o seu e-mail.
        </p>

        {/* Inputs de código */}
        <div className="flex justify-between mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Verificar
        </button>

        <p className="text-gray-500 text-sm mt-4">
          Não recebeu o código?{" "}
          <button className="text-blue-600 hover:underline">Reenviar</button>
        </p>
      </div>

      <footer className="mt-10 text-gray-400 text-sm">
        © 2025 MyWebsite. Todos os direitos reservados.
      </footer>
    </div>
  );
}
