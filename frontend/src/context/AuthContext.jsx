import { createContext, useState, useEffect } from "react";
import { AuthService } from "../service/authService";

export const AuthContext = createContext();

const authService = new AuthService();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN
  async function login(email, password) {
    const data = await authService.login(email, password);

    if (data.success) {
      const profile = await authService.getProfile();
      setUser(profile.user);
    }

    return data;
  }

  // LOGOUT
  async function logout() {
    await authService.logout();
    setUser(null);
  }

  async function register(name, email, password, confirmpassword) {
    return await authService.register(name, email, password, confirmpassword);
  }

  async function sendVerifyOtp(email) {
    return await authService.sendVerifyOtp(email);
  }

  async function verifyEmail(email, otp) {
    return await authService.verifyEmail(email, otp);
  }

  // Recarregar usuário no carregamento da página
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await authService.getProfile();
        if (data.success) setUser(data.user);
      } catch (_) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        login,
        logout,
        register,
        sendVerifyOtp,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
