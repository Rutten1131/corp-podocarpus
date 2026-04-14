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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase">
            Panel de Control <span className="text-andina-primary">Gerencial</span>
          </h2>
          <p className="text-andina-text/60 font-mono text-[10px] uppercase tracking-[0.4em] mt-3 font-bold flex items-center gap-2">
            <TrendingUp size={12} className="text-andina-primary" /> Inteligencia operativa • Cooperativa Podocarpus
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-andina-surface/40 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-andina-text hover:bg-andina-primary/10 hover:border-andina-primary/30 transition-all shadow-2xl active:scale-95 group">
            <Filter size={18} className="text-andina-primary group-hover:rotate-180 transition-transform duration-500" />
            <span>Filtrado T&aacute;ctico</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
      >
        <KpiCard
          title="Socios Activos"
          value={`${KPI.sociosActivos}/${KPI.totalSocios}`}
          trend="+2 este periodo"
          positive={true}
          icon={<Users className="text-andina-primary" size={24} />}
        />
        <KpiCard
          title="Flujo Mensual"
          value={`$${KPI.ingresoMensual.toLocaleString()}`}
          trend="+4.2% rendimiento"
          positive={true}
          icon={<DollarSign className="text-white" />}
          primary
        />
        <KpiCard
          title="Morosidad Global"
          value={`${KPI.morosidad}%`}
          trend="-1.5% mitigaci&oacute;n"
          positive={true}
          icon={<Users className="text-andina-accent" size={24} />}
        />
        <KpiCard
          title="Mantenimientos"
          value={KPI.mantenimientosPendientes.toString()}
          trend={`${KPI.documentosVencidos} alertas cr&iacute;ticas`}
          positive={false}
          icon={<AlertTriangle className="text-[#FF4D4D]" size={24} />}
          alert
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 100 }}
        className="grid grid-cols-1 xl:grid-cols-12 gap-8"
      >
        <div className="xl:col-span-12 2xl:col-span-8 bg-andina-surface/30 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
             <TrendingUp size={200} />
          </div>
          <div className="mb-10 relative z-10">
            <h3 className="text-2xl font-black text-white italic tracking-tight">An&aacute;lisis de Caja Proyectado</h3>
            <p className="text-[10px] font-black font-mono text-andina-text/40 uppercase tracking-[0.4em] mt-2 italic">Performance Operativo / Gastos vs Ingresos</p>
          </div>
          <div className="h-[400px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INGRESOS_MENSUALES} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "rgba(255, 255, 255, 0.3)", fontWeight: 'black', fontFamily: "var(--font-mono)" }} dy={20} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "rgba(255, 255, 255, 0.3)", fontWeight: 'black', fontFamily: "var(--font-mono)" }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(5, 10, 8, 0.95)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', backdropFilter: 'blur(30px)' }}
                  itemStyle={{ fontFamily: 'var(--font-sans)', color: '#fff', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.3)', fontWeight: '900', fontSize: '9px', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, undefined] as any}
                />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#22c55e" strokeWidth={5} fillOpacity={1} fill="url(#colorIngresos)" animationDuration={2000} />
                <Area type="monotone" dataKey="gastos" name="Gastos" stroke="#C9A84C" strokeWidth={5} fillOpacity={1} fill="url(#colorGastos)" animationDuration={2500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-12 2xl:col-span-4 bg-andina-surface/30 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-3xl p-8 md:p-10 flex flex-col relative overflow-hidden group">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-white italic tracking-tight">Efectividad de Rutas</h3>
            <p className="text-[10px] font-black font-mono text-andina-text/40 uppercase tracking-[0.4em] mt-2 italic">Ocupaci&oacute;n / Cobertura Territorial</p>
          </div>
          <div className="flex-1 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OCUPACION_RUTAS} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="ruta" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)", fontWeight: 'black', letterSpacing: '0.1em' }} 
                  width={90}
                  tickFormatter={(t) => t.toUpperCase()}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: 'rgba(5, 10, 8, 0.95)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', backdropFilter: 'blur(30px)' }}
                  itemStyle={{ fontFamily: 'var(--font-sans)', color: '#fff', fontSize: '10px', fontWeight: '900' }}
                  formatter={(value: any) => [`${value}%`, 'Ocupación'] as any}
                />
                <Bar dataKey="ocupacion" radius={[0, 12, 12, 0]} barSize={24} animationDuration={2000}>
                  {OCUPACION_RUTAS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.ocupacion > 90 ? '#C9A84C' : entry.ocupacion < 70 ? 'rgba(255,255,255,0.05)' : '#22c55e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black text-andina-text/20 uppercase tracking-[0.2em] font-mono">
             <span>Demanda Promedio</span>
             <span className="text-white">82%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}

function KpiCard({ title, value, trend, positive, icon, primary = false, alert = false }: any) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } }}
      className={`relative overflow-hidden rounded-[2.5rem] border p-8 shadow-3xl transition-all duration-500 group
        ${primary ? 'bg-gradient-to-br from-andina-primary/30 to-[#050a08] border-andina-primary/40 shadow-andina-primary/10' : 
          alert ? 'bg-gradient-to-br from-[#FF4D4D]/20 to-[#050a08] border-[#FF4D4D]/40' : 
          'bg-andina-surface/40 border-white/5 hover:border-white/10'}`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:rotate-45 transition-transform duration-700 pointer-events-none">
         {icon}
      </div>

      {alert && (
         <div className="absolute top-0 right-0 left-0 h-[4px] bg-gradient-to-r from-transparent via-[#FF4D4D] to-transparent opacity-100 animate-pulse" />
      )}
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <p className="text-andina-text/40 font-mono text-[9px] font-black uppercase tracking-[0.3em] italic mb-2 leading-none">{title}</p>
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="text-4xl font-black font-heading text-white drop-shadow-2xl"
          >
            {value}
          </motion.h4>
        </div>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl
          ${primary ? 'bg-andina-primary text-white shadow-andina-primary/20 scale-110' : 
            alert ? 'bg-[#FF4D4D] text-white shadow-[#FF4D4D]/20' : 
            'bg-white/5 border border-white/10 group-hover:bg-white/10'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-10 flex items-center text-[10px] gap-2 font-black uppercase tracking-widest relative z-10 italic">
        {positive !== undefined && !alert ? (
          <div className={`p-1 rounded-md ${positive ? 'bg-andina-primary/10' : 'bg-[#FF4D4D]/10'}`}>
            {positive ? <TrendingUp size={14} className="text-andina-primary" /> : <TrendingDown size={14} className="text-[#FF4D4D]" />}
          </div>
        ) : alert ? (
          <div className="p-1 rounded-md bg-[#FF4D4D]/10 animate-pulse">
            <AlertTriangle size={14} className="text-[#FF4D4D]" />
          </div>
        ) : null}
        <span className={`${alert ? 'text-[#FF4D4D]' : positive ? 'text-andina-primary' : 'text-andina-text/30'}`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
}
