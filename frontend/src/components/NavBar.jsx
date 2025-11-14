import React from "react";


export const Navbar = () => {

    return (
    <div>
            {/* Navbar */}
      <nav className="bg-gray-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">MyWebsite</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-600 transition-colors">
                Entrar
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-blue-600 transition-colors">
                Cadastrar
              </a>
            </li>
            
          </ul>
        </div>
      </nav>
        </div>
    )

}