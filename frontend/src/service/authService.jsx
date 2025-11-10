const API_AUTH = "http://localhost:5000";

export class AuthService {

    // ====== registro ======
    async Register(name, email, password, confirmpassword) {

        try {
            
            const response = await fetch(`${API_AUTH}/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, confirmpassword })
            })

            if (!response) {
                const text = await response.text();
                throw new Error(`Erro ${response.status}: ${text}`);
            }

        } catch (error) {
            throw new Error('Erro na criação do registro');
        }

    }


    // ====== login ======
    async Login(email, password) {

        try {
            
            const response = await fetch(`${API_AUTH}/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if (!response) {
                const text = await response.text();
                throw new Error(`Erro ${response.status}: ${text}`);
            }

        } catch (error) {
            throw new Error('Erro na parte de logar');
        }

    }


    // ====== logout ======
    async Login() {

        try {
            
            const response = await fetch(`${API_AUTH}/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if (!response) {
                const text = await response.text();
                throw new Error(`Erro ${response.status}: ${text}`);
            }

        } catch (error) {
            throw new Error('Erro na parte de logar');
        }

    }

}