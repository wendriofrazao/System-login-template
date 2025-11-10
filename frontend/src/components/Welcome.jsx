
export const WelcomeApp = () => {
    return (
            <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">MyWebsite</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                About
              </a>
            </li>
            
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Bem-vindo à Home Page</h2>
        <p className="text-gray-600 max-w-lg">
          Esta é uma página inicial simples feita com React e Tailwind CSS.
          Rápida, responsiva e moderna.
        </p>
        <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Começar
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-sm text-gray-500">
        © 2025 MyWebsite. Todos os direitos reservados.
      </footer>
    </div>
    )
}