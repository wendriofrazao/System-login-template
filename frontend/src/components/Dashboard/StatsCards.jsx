import React from "react";

export const StatsCard = ({ title, value, icon: Icon, trend, variant = "default" }) => {
  const variantStyles = {
    default: "bg-white border border-gray-200",
    success: "bg-gradient-to-br from-green-100 to-green-50 border border-green-200",
    warning: "bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200",
    primary: "bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200",
  };

  const iconStyles = {
    default: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    primary: "bg-blue-100 text-blue-600",
  };

  return (
    <div
      className={`${variantStyles[variant]} p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        
        {/* Left content */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>

          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-semibold ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-xs text-gray-500">vs mês anterior</span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div className={`p-3 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>

      </div>
    </div>
  );
};


