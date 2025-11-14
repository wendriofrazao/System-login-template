import { AuthService } from "../service/authService.jsx";

const authService = new AuthService();

export class AuthHooks {
    
    async Registration(name, email, password, confirmpassword) {
        try {
            const res = await authService.register(name, email, password, confirmpassword);
            return res; 
        } catch (error) {
            console.error("Erro no registro:", error);
            throw error;
        }
    }

  async Login(email, password) {
        try {
            const res = await authService.login(email, password);
            return res;
        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    }

  async Logout() {
        try {
            const res = await authService.Logout()
            return res;
        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    }

  async SendOtp(email) {
        try {
            const res = await authService.sendVerifyOtp(email);
            return res;
        } catch (error) {
            console.error("Erro no OTP:", error);
            throw error;
        }
    }

  async VerifyAccount(email, otp) {
        try {
            const res = await authService.verifyEmail(email, otp);
            return res;
        } catch (error) {
            console.error("Erro no OTP:", error);
            throw error;
        }
    }

}
