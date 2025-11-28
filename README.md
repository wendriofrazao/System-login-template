# 🔑 System-login-templete
 É um modelo de sistema de login para aplicações web. Ele inclui autenticação de usuários, validação de formulários e interface responsiva, ideal para ter como base para novos projetos.

## ⚙️ Funcionalidades
-  **Autenticação segura**: login com verificação de credenciais e proteção contra acessos não autorizados.  
-  **Design responsivo**: interface adaptável para desktops, tablets e smartphones.  
-  **Validação em tempo real**: checagem rápida de campos obrigatórios (usuário, senha, e-mail).  
-  **Mensagens de erro amigáveis**: feedback claro e intuitivo para o usuário.  

## 💻 Tecnologias

- **MongoDB + Mongoose** → banco de dados e ODM para modelagem de dados   
- **React.js + Vite e Tailwind** → biblioteca para criar a interface do usuário e um framework de estilização
- **Node.js + Express.js** → ambiente de execução JavaScript no servidor e framework para o backend 
- **JWT (JSON Web Token)** → autenticação baseada em tokens  
- **Bcrypt.js** → criptografia de senhas para maior segurança
- **cookie-parser** → middleware para ler e manipular cookies no Express  
- **cors** → habilita compartilhamento de recursos entre diferentes domínios (CORS)  
- **nodemailer** → envio de emails pelo Node.js  
- **nodemon** → reinício automático do servidor durante o desenvolvimento

## 📂 Estrutura do Projeto

```bash
/System-Login-Template
│
├── backend/ # Código do servidor (Node.js + Express)
│ ├── config/ # Configurações (banco, autenticação, variáveis de ambiente etc.)
│ ├── controllers/ # Lógica das funcionalidades (login, register etc.)
│ ├── middlewares/ # Middlewares (ex: checagem de token, autorização, validação)
│ ├── models/ # Modelos do banco (Mongoose + MongoDB)
│ ├── routes/ # Definição das rotas da API
│ └── server.js 
│
├── frontend/ # Interface do usuário (React.js + Vite e Tailwind)
│ ├── public/
│ └── src/ # Código fonte React
│ ├── components/ 
│ ├── pages/ # 
│ ├── services/ # Serviços de comunicação com a API (fetch/axios, chamadas HTTP)
│ ├── App.jsx 
│ └── index.jsx 
│
├── tests/
├── package.json 
└── README.md
```

## 🚀 Como baixar e rodar localmente

1. Clone o repositório  
   ```bash
   git clone https://github.com/wendriofrazao/System-login-template.git
   ```
2. Acesse a pasta do projeto
    ```bash
   cd System-login-template
   ```
3. Instale as dependências e rode o backend
    ```bash
   cd backend
   npm install
   # configurar variáveis de ambiente se necessário (ex: URI do MongoDB, secret JWT etc.)
   npm run dev     # ou node server.js
   ```
4. Instale as dependências e rode o frontend
    ```bash
   cd ../frontend
   npm install
   npm run dev  
   ```
