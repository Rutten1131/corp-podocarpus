"use client";

import { KPI, INGRESOS_MENSUALES, OCUPACION_RUTAS, NOTIFICACIONES_RECIENTES } from "@/lib/mock-data";
import { Users, AlertTriangle, TrendingUp, TrendingDown, Filter, Bell, XCircle, Zap, ShieldCheck, Info } from "lucide-react";
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
          title="Clientes Activos"
          value={`${KPI.sociosActivos}/${KPI.totalSocios}`}
          trend={`${KPI.totalSocios - KPI.sociosActivos} inactivos (Retargeting)`}
          positive={false}
          icon={<Users className="text-andina-primary" size={24} />}
        />
        <KpiCard
          title="Cancelaciones del Mes"
          value={`4 bajas`}
          trend="Impacto: -$160 (mensualidades)"
          positive={false}
          icon={<XCircle className="text-white" size={24} />}
          primary
        />
        <KpiCard
          title="Notificaciones Autom&aacute;ticas"
          value={`1,024`}
          trend="+15% efectividad de cobro"
          positive={true}
          icon={<Bell className="text-andina-accent" size={24} />}
        />
        <KpiCard
          title="Mantenimiento de mi Unidad"
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
            <h3 className="text-2xl font-black text-white italic tracking-tight">Proyecci&oacute;n de Ingresos del Mes Actual</h3>
            <p className="text-[10px] font-black font-mono text-andina-text/40 uppercase tracking-[0.4em] mt-2 italic">Identificando los ingresos proyectados y los reales</p>
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
                <Area type="monotone" dataKey="ingresos" name="Reales" stroke="#22c55e" strokeWidth={5} fillOpacity={1} fill="url(#colorIngresos)" animationDuration={2000} />
                <Area type="monotone" dataKey="gastos" name="Proyectados" stroke="#C9A84C" strokeWidth={5} fillOpacity={1} fill="url(#colorGastos)" animationDuration={2500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-12 2xl:col-span-4 bg-andina-surface/30 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-3xl p-8 md:p-10 flex flex-col relative overflow-hidden group">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-white italic tracking-tight">Efectividad de Rutas</h3>
            <p className="text-[10px] font-black font-mono text-andina-text/40 uppercase tracking-[0.4em] mt-2 italic">Ocupaci&oacute;n / Morosidad proyectada</p>
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
                <Bar dataKey="ocupacion" name="Ocupación" radius={[0, 12, 12, 0]} barSize={16} animationDuration={2000}>
                  {OCUPACION_RUTAS.map((entry, index) => (
                    <Cell key={`cell-occ-${index}`} fill={entry.ocupacion > 90 ? '#22c55e' : entry.ocupacion < 70 ? 'rgba(255,255,255,0.05)' : '#22c55e'} />
                  ))}
                </Bar>
                <Bar dataKey="morosidad" name="Morosidad" radius={[0, 12, 12, 0]} barSize={16} animationDuration={2500}>
                  {OCUPACION_RUTAS.map((entry, index) => (
                    <Cell key={`cell-mor-${index}`} fill={entry.morosidad > 20 ? '#FF4D4D' : '#C9A84C'} />
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

      {/* Dynamic Intelligence Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10"
      >
        {/* Notifications Feed */}
        <div className="xl:col-span-2 bg-andina-surface/20 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-8 overflow-hidden group">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-black text-white italic tracking-tight">Actividad Autom&aacute;tica</h3>
                 <p className="text-[9px] font-black font-mono text-andina-text/40 uppercase tracking-[0.4em] mt-1">Inteligencia Artificial en ejecuci&oacute;n</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-andina-primary/10 flex items-center justify-center text-andina-primary border border-andina-primary/20 animate-pulse">
                 <Zap size={20} />
              </div>
           </div>
           
           <div className="space-y-4">
              {NOTIFICACIONES_RECIENTES.map((notif) => (
                 <div key={notif.id} className="flex items-center justify-between p-5 rounded-[1.8rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group/item">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                          ${notif.estado === 'exitoso' ? 'bg-andina-primary/10 text-andina-primary' : 
                            notif.estado === 'alerta' ? 'bg-[#C9A84C]/10 text-[#C9A84C]' : 
                            notif.estado === 'critico' ? 'bg-[#FF4D4D]/10 text-[#FF4D4D]' : 'bg-white/10 text-white'}`}>
                          {notif.estado === 'exitoso' ? <ShieldCheck size={18} /> : 
                           notif.estado === 'alerta' ? <AlertTriangle size={18} /> : 
                           notif.estado === 'critico' ? <XCircle size={18} /> : <Info size={18} />}
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white tracking-tight">{notif.mensaje}</p>
                          <p className="text-[9px] font-black uppercase text-andina-text/30 mt-1 font-mono tracking-widest">{notif.hora} • SISTEMA AUTÓNOMO</p>
                       </div>
                    </div>
                    <button className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[9px] font-black uppercase tracking-widest text-andina-primary">Detalles</button>
                 </div>
              ))}
           </div>
        </div>

        {/* Retargeting Card */}
        <div className="bg-gradient-to-br from-[#C9A84C]/20 to-[#050a08] rounded-[3rem] border border-[#C9A84C]/30 p-8 flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-[#C9A84C]/10 blur-[80px] rounded-full pointer-events-none"></div>
           
           <div>
              <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] text-black flex items-center justify-center mb-6 shadow-2xl shadow-[#C9A84C]/20 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                 <Users size={28} />
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tight leading-none mb-2">Oportunidad de Retargeting</h3>
              <p className="text-[10px] text-andina-text/60 leading-relaxed font-medium">
                 Hemos detectado <span className="text-[#C9A84C] font-black">3 ex-clientes</span> que suspendieron su servicio recientemente. Est&aacute;n en rutas con alta disponibilidad. 
              </p>
           </div>

           <div className="mt-8 space-y-3">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-andina-text/40">Recuperaci&oacute;n Estimada</span>
                    <span className="text-andina-primary font-black text-xs">+$180 / mes</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-andina-primary"></div>
                 </div>
              </div>
              <button className="w-full py-4 bg-[#C9A84C] hover:bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all shadow-xl active:scale-95">
                 Iniciar Campaña Autom&aacute;tica
              </button>
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
