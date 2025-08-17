# 🔑 System-login-templete
 É um modelo de sistema de login para aplicações web. Ele inclui autenticação de usuários, validação de formulários e interface responsiva, ideal para ter como base para novos projetos.

## ⚙️ Funcionalidades
-  **Autenticação segura**: login com verificação de credenciais e proteção contra acessos não autorizados.  
-  **Design responsivo**: interface adaptável para desktops, tablets e smartphones.  
-  **Validação em tempo real**: checagem rápida de campos obrigatórios (usuário, senha, e-mail).  
-  **Mensagens de erro amigáveis**: feedback claro e intuitivo para o usuário.  

## 💻 Tecnologias

- **MongoDB + Mongoose** → banco de dados e ODM para modelagem de dados   
- **React.js + Vite** → biblioteca para criar a interface do usuário  
- **Node.js + Express.js** → ambiente de execução JavaScript no servidor e framework para o backend 
- **JWT (JSON Web Token)** → autenticação baseada em tokens  
- **Bcrypt.js** → criptografia de senhas para maior segurança
- **cookie-parser** → middleware para ler e manipular cookies no Express  
- **cors** → habilita compartilhamento de recursos entre diferentes domínios (CORS)  
- **nodemailer** → envio de emails pelo Node.js  
- **nodemon** → reinício automático do servidor durante o desenvolvimento

## Estrutura do Projeto

```bash
/System-Login-Template
│
├── /backend              # Código do servidor (Node.js + Express)
│   ├── /config           # Configurações (db, autenticação, etc)
│   ├── /controllers      # Lógica de cada funcionalidade (login, registro)
│   ├── /middlewares      # Verificar se o usuário está logado (autenticação), se ele tem permissão (autorização), etc.
│   ├── /models           # Modelos do banco (Mongoose + MongoDB)
│   ├── /routes           # Definição das rotas da API
│   └── server.js         # Arquivo principal do backend
│
├── /frontend             # Interface do usuário (React.js)
│   ├── /public           # Arquivos públicos (index.html, favicon, etc)
│   ├── /src
│   │   ├── /components   # Componentes reutilizáveis (Form, Input, Button)
│   │   ├── /pages        # Páginas principais (Login, Register)
│   │   ├── /services     # Conexão com API (fetch/axios)
│   │   ├── App.js        # Configuração principal do React
│   │   └── index.js      # Ponto de entrada do React
│
├── /tests                # Testes unitários e de integração
├── package.json          # Dependências do projeto
└── README.md             # Documentação principal
