"use client";

import { KPI, INGRESOS_MENSUALES, OCUPACION_RUTAS } from "@/lib/mock-data";
import { Users, AlertTriangle, TrendingUp, Filter } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Panel Gerencial</h2>
          <p className="text-surface-500 text-sm mt-1">Resumen operativo de la Cooperativa Podocarpus</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors shadow-sm">
          <Filter size={16} />
          <span>Este Mes</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Socios Activos"
          value={`${KPI.sociosActivos}/${KPI.totalSocios}`}
          trend="+2 este año"
          icon={<Users className="text-info" />}
          bgColor="bg-blue-50"
        />
        <KpiCard
          title="Ingresos Mensuales"
          value={`$${KPI.ingresoMensual.toLocaleString()}`}
          trend="+4.2% vs mes anterior"
          icon={<TrendingUp className="text-success" />}
          bgColor="bg-green-50"
        />
        <KpiCard
          title="Morosidad Padres"
          value={`${KPI.morosidad}%`}
          trend="-1.5% vs mes anterior"
          icon={<TrendingUp className="text-success" />}
          bgColor="bg-green-50"
        />
        <KpiCard
          title="Mantenimientos / Alertas"
          value={KPI.mantenimientosPendientes.toString()}
          trend={`${KPI.documentosVencidos} docs vencidos`}
          icon={<AlertTriangle className="text-warning" />}
          bgColor="bg-yellow-50"
          alert
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-surface-200 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-surface-900">Flujo de Caja (6 meses)</h3>
            <p className="text-sm text-surface-500">Ingresos vs Gastos de la cooperativa</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INGRESOS_MENSUALES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-surface-200)" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-surface-500)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-surface-500)" }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, undefined] as any}
                />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="var(--color-success)" strokeWidth={2} fillOpacity={1} fill="url(#colorIngresos)" />
                <Area type="monotone" dataKey="gastos" name="Gastos Operativos" stroke="var(--color-danger)" strokeWidth={2} fillOpacity={1} fill="url(#colorGastos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-surface-900">Ocupación por Ruta</h3>
            <p className="text-sm text-surface-500">Porcentaje de capacidad usada</p>
          </div>
          <div className="flex-1 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OCUPACION_RUTAS} layout="vertical" margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-surface-200)" />
                <XAxis type="number" hide />
                <YAxis dataKey="ruta" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-surface-700)", fontWeight: 500 }} />
                <Tooltip
                  cursor={{ fill: 'var(--color-surface-50)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, 'Ocupación'] as any}
                />
                <Bar dataKey="ocupacion" radius={[0, 4, 4, 0]}>
                  {OCUPACION_RUTAS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.ocupacion > 90 ? 'var(--color-brand-500)' : entry.ocupacion < 70 ? 'var(--color-warning)' : 'var(--color-info)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, icon, bgColor, alert = false }: any) {
  return (
    <div className={`bg-white rounded-xl border ${alert ? 'border-warning/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-surface-200'} p-5 shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-surface-500 text-sm font-medium">{title}</p>
          <h4 className="text-2xl font-bold text-surface-900 mt-2">{value}</h4>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgColor}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs">
        <span className={`${alert ? 'text-danger font-medium' : 'text-surface-500'}`}>{trend}</span>
      </div>
    </div>
  );
}
