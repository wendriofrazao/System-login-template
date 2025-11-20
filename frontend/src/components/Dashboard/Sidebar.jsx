import React from "react";
import { Home, Users, Shield, Settings, BarChart3 } from "lucide-react";

export const Sidebar = ({ activeSection = "dashboard" }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "Usuários", icon: Users },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "analytics", label: "Análises", icon: BarChart3 },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg text-gray-800">AuthDash</h1>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  className={
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 " +
                    (isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

