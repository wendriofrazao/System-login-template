import React from "react";
import { Header } from "../components/Dashboard/Header";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { StatsCard } from "../components/Dashboard/StatsCards";
import { Users, UserCheck, UserX, Activity } from "lucide-react";
import { useAuth } from "../hooks/AuthHooks.jsx";

export function Dashboard() {

  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection="dashboard" />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Gerencie e monitore seus recursos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total de Usuários"
                value="1,234"
                icon={Users}
                variant="primary"
                trend={{ value: "12%", isPositive: true }}
              />

              <StatsCard
                title="Usuários Ativos"
                value="1,180"
                icon={UserCheck}
                variant="success"
                trend={{ value: "8%", isPositive: true }}
              />

              <StatsCard
                title="Pendentes"
                value="42"
                icon={UserX}
                variant="warning"
                trend={{ value: "3%", isPositive: false }}
              />

              <StatsCard
                title="Taxa de Atividade"
                value="95.6%"
                icon={Activity}
                variant="default"
                trend={{ value: "2%", isPositive: true }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
