import React, { useState, useEffect } from "react";
import { AuthService } from "../service/authService.jsx";

const authService = new AuthService();

export function ResetPassword() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  /* ======================
     Validação de senhas
  ====================== */
  useEffect(() => {
    if (!confirmNewPassword) return;

    if (newPassword !== confirmNewPassword) {
      setType("error");
      setMessage("As senhas não coincidem!");
    } else {
      setMessage("");
    }
  }, [newPassword, confirmNewPassword]);

  /* ======================
     OTP handlers
  ====================== */
  function handleOtpChange(e, index) {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1) {
      e.target.nextSibling?.focus();
    }
  }

  function handleOtpKeyDown(e, index) {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        e.target.previousSibling?.focus();
      }
    }
  }

  /* ======================
     Submit
  ====================== */
  async function handleOnSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setType("error");
      setMessage("As senhas não coincidem!");
      return;
    }

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setType("error");
      setMessage("Digite o código OTP completo.");
      return;
    }

    try {
      const response = await authService.resetPassword(
        email,
        otpCode,
        newPassword
      );

      if (response.success) {
        setType("success");
        setMessage("Senha redefinida com sucesso!");
      } else {
        setType("error");
        setMessage(response.message || "Erro ao redefinir senha.");
      }
    } catch (error) {
      setType("error");
      setMessage(error.message || "Erro ao trocar de senha.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Resetar Senha
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Insira o código OTP, seu email e a nova senha.
        </p>

        <form className="space-y-6" onSubmit={handleOnSubmit}>
          {/* OTP */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Código OTP
            </label>

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-12 h-12 border border-gray-300 rounded-lg 
                             text-center text-xl font-semibold
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Insira seu email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nova Senha */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Nova Senha
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirmar Nova Senha */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Repita a nova senha"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 
                       rounded-lg hover:bg-blue-700 transition"
          >
            Redefinir Senha
          </button>
        </form>

        {message && (
          <p
            className={`mt-2 ${
              type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <footer className="mt-10 text-gray-400 text-sm text-center">
        © 2025 MyWebsite. Todos os direitos reservados.
      </footer>
    </div>
  );
}
