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

  async function resetOtp(email) {
    return await authService.resetOtp(email);
  }

  // Recarregar usuário no carregamento da página
  useEffect(() => {
  let isMounted = true;

  async function loadUser() {
    try {
      const data = await authService.getProfile();

      if (isMounted && data?.success && data.user) {
        setUser(data.user);
      } else if (isMounted) {
        setUser(null);
      }
    } catch (error) {
      if (isMounted) {
        console.warn("Falha ao carregar usuário:", error.message);
        setUser(null);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }

  loadUser();

  return () => {
    isMounted = false;
  };
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
        resetOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
