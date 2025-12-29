const API_AUTH = "http://localhost:5000/api/auth";


export class AuthService {

    async getProfile() {
        try {
            const res = await fetch(`${API_AUTH}/profile`, {
                method: "GET",
                credentials: "include",
            });

                const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `Erro ${res.status}`);
            }

            return data;
        } catch (error) {
            console.error("Erro em pegar perfil:", error);
            throw error;
        }
    }

    // ====== registro ======
    async register(name, email, password, confirmpassword) {

        try {
            
            const response = await fetch(`${API_AUTH}/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({name, email, password, confirmpassword})
            })

             const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erro ${response.status}`);
            }

             return data;

        } catch (error) {
            console.error("Erro no AuthService.register:", error);
            throw error;
        }

    }


    // ====== login ======
    async login(email, password) {

        try {
            
            const response = await fetch(`${API_AUTH}/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({email, password})
            })

             const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erro ${response.status}`);
            }

             return data;

        } catch (error) {
            console.error("Erro no AuthService.login:", error);
            throw error;
        }

    }


    // ====== logout ======
    async logout() {

        try {
            
            const response = await fetch(`${API_AUTH}/logout`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })

            if (!response) {
                const text = await response.text();
                throw new Error(`Erro ${response.status}: ${text}`);
            }

        } catch (error) {
            console.error("Erro no AuthService.logout:", error);
            throw error;0
        }

    }


    // ==== verificar opt =====
     async sendVerifyOtp(email) {

        try {
            
            const response = await fetch(`${API_AUTH}/verify-otp`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({email})
            })

             const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erro ${response.status}`);
            }

             return data;

        } catch (error) {
            console.error("Erro no AuthService.sendVerifyOtp:", error);
            throw error;
        }

    }



    // ==== verificar conta =====
     async verifyEmail(email, otp) {

        try {
            
            const response = await fetch(`${API_AUTH}/verify-Account`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({email, otp})
            })

             const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erro ${response.status}`);
            }

             return data;

        } catch (error) {
            console.error("Erro no AuthService.sendVerifyOtp:", error);
            throw error;
        }

    }


    // ==== resetar otp =====
     async resetOtp(email) {

        try {
            
            const response = await fetch(`${API_AUTH}/reset-otp`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({email})
            })

             const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erro ${response.status}`);
            }

             return data;

        } catch (error) {
            console.error("Erro no AuthService.sendVerifyOtp:", error);
            throw error;
        }

    }


    // ==== verificar conta =====
     async resetPassword(email, otp, newPassword) {

        try {
            
            const response = await fetch(`${API_AUTH}/reset-password`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({email, otp, newPassword})
            })

             const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erro ${response.status}`);
            }

             return data;

        } catch (error) {
            console.error("Erro no AuthService.sendVerifyOtp:", error);
            throw error;
        }

    }

}