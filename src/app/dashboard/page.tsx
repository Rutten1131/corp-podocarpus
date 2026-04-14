"use client";

import { KPI, INGRESOS_MENSUALES, OCUPACION_RUTAS } from "@/lib/mock-data";
import { Users, AlertTriangle, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-andina-text tracking-tight">Panel Gerencial</h2>
          <p className="text-andina-text/50 font-mono text-xs uppercase tracking-wider mt-1">Resumen operativo • Cooperativa Podocarpus</p>
        </div>
        <button className="flex items-center gap-2 bg-andina-surface border border-andina-border px-4 py-2 rounded-lg text-sm font-medium text-andina-text hover:bg-white/5 hover:border-andina-primary/30 transition-all shadow-sm">
          <Filter size={16} className="text-andina-primary" />
          <span>Filtro Financiero</span>
        </button>
      </div>

      {/* KPI Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KpiCard
          title="Socios Activos"
          value={`${KPI.sociosActivos}/${KPI.totalSocios}`}
          trend="+2 este año"
          positive={true}
          icon={<Users className="text-andina-primary" />}
        />
        <KpiCard
          title="Ingresos Mensuales"
          value={`$${KPI.ingresoMensual.toLocaleString()}`}
          trend="+4.2% vs anterior"
          positive={true}
          icon={<DollarSign className="text-white" />}
          primary
        />
        <KpiCard
          title="Morosidad Padres"
          value={`${KPI.morosidad}%`}
          trend="-1.5% vs anterior"
          positive={true}
          icon={<Users className="text-andina-accent" />}
        />
        <KpiCard
          title="Mantenimientos"
          value={KPI.mantenimientosPendientes.toString()}
          trend={`${KPI.documentosVencidos} docs vencidos`}
          positive={false}
          icon={<AlertTriangle className="text-[#FF4D4D]" />}
          alert
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 bg-andina-bg/40 backdrop-blur-md rounded-xl border border-andina-border shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-heading font-semibold text-andina-text">Flujo de Caja (6 meses)</h3>
            <p className="text-xs font-mono text-andina-text/40 uppercase tracking-widest mt-1">Ingresos vs Gastos</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INGRESOS_MENSUALES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-andina-primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-andina-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-andina-accent)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-andina-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-andina-border)" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(230, 237, 243, 0.5)", fontFamily: "var(--font-mono)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(230, 237, 243, 0.5)", fontFamily: "var(--font-mono)" }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-andina-surface)', borderRadius: '8px', border: '1px solid var(--color-andina-border)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)', fontFamily: 'var(--font-mono)' }}
                  itemStyle={{ fontFamily: 'var(--font-sans)', color: 'var(--color-andina-text)' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, undefined] as any}
                />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="var(--color-andina-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                <Area type="monotone" dataKey="gastos" name="Gastos" stroke="var(--color-andina-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorGastos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-andina-bg/40 backdrop-blur-md rounded-xl border border-andina-border shadow-lg p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-heading font-semibold text-andina-text">Ocupación por Ruta</h3>
            <p className="text-xs font-mono text-andina-text/40 uppercase tracking-widest mt-1">Capacidad Usada</p>
          </div>
          <div className="flex-1 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OCUPACION_RUTAS} layout="vertical" margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-andina-border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="ruta" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(230,237,243,0.7)", fontWeight: 500 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'var(--color-andina-surface)', borderRadius: '8px', border: '1px solid var(--color-andina-border)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)', fontFamily: 'var(--font-mono)' }}
                  itemStyle={{ fontFamily: 'var(--font-sans)', color: 'var(--color-andina-text)' }}
                  formatter={(value: any) => [`${value}%`, 'Ocupación'] as any}
                />
                <Bar dataKey="ocupacion" radius={[0, 4, 4, 0]}>
                  {OCUPACION_RUTAS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.ocupacion > 90 ? 'var(--color-andina-accent)' : entry.ocupacion < 70 ? 'var(--color-andina-text)' : 'var(--color-andina-primary)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}

function KpiCard({ title, value, trend, positive, icon, primary = false, alert = false }: any) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl border p-5 shadow-lg glassmorphism transition-shadow duration-300
        ${primary ? 'bg-gradient-to-br from-andina-primary/20 to-andina-primary/5 border-andina-primary/30 hover:shadow-[0_8px_30px_rgb(46,168,79,0.15)]' : 
          alert ? 'bg-andina-surface/40 backdrop-blur-md border-[#FF4D4D]/40 hover:shadow-[0_8px_30px_rgb(255,77,77,0.15)]' : 
          'bg-andina-surface/40 backdrop-blur-md border-andina-border hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]'}`}
    >
      {alert && (
         <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D4D] to-transparent opacity-70 animate-pulse" />
      )}
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-andina-text/60 font-mono text-[10px] uppercase tracking-widest">{title}</p>
          <motion.h4 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
            className={`text-2xl font-bold font-heading mt-2 ${primary ? 'text-andina-primary' : 'text-andina-text'}`}
          >
            {value}
          </motion.h4>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${primary ? 'bg-andina-primary shadow-inner shadow-white/20' : 'bg-white/5 border border-white/5'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs gap-1.5 font-medium">
        {positive !== undefined && !alert ? (
          positive ? <TrendingUp size={14} className="text-andina-primary" /> : <TrendingDown size={14} className="text-[#FF4D4D]" />
        ) : null}
        <span className={`${alert ? 'text-[#FF4D4D]' : positive ? 'text-andina-primary' : 'text-andina-text/50'}`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
}
