"use client";

import { motion } from "framer-motion";
import { Banknote, TrendingUp, Users, PieChart, ShieldCheck, ArrowUpRight, ArrowDownRight, Briefcase } from "lucide-react";

export default function MonetizacionPage() {
  const stats = [
    { label: "Fondo de Mantenimiento", value: "$4,250", trend: "+12%", type: "up", icon: Banknote },
    { label: "Ingresos por Publicidad", value: "$12,840", trend: "+25%", type: "up", icon: TrendingUp },
    { label: "Aliados Comerciales", value: "18", trend: "3 Nuevos", type: "up", icon: Users },
    { label: "Ahorro Operat. Socio", value: "$180/mes", trend: "-5% Costo", type: "up", icon: ShieldCheck }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Monetizaci&oacute;n & <span className="text-andina-primary">Alianzas</span>
          </h1>
          <p className="text-andina-text/60 font-mono text-[10px] uppercase tracking-[0.3em] mt-2 font-bold flex items-center gap-2">
            <TrendingUp size={12} className="text-andina-primary" /> Gesti&oacute;n de ingresos tácticos extra-operativos
          </p>
        </div>
        <button className="bg-andina-primary px-8 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 relative">
          <Briefcase size={18} /> Nuevo Convenio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-andina-surface/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
               <stat.icon size={80} className="text-andina-primary" />
            </div>
            <p className="text-[10px] text-andina-text/40 font-black uppercase tracking-[0.2em] mb-4 font-mono">{stat.label}</p>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter group-hover:text-andina-primary transition-colors">{stat.value}</h3>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.type === "up" ? "bg-andina-primary/10 text-andina-primary" : "bg-andina-accent/10 text-andina-accent"}`}>
                {stat.type === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Management of Promoters */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-andina-surface/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-andina-primary/10 flex items-center justify-center text-andina-primary border border-andina-primary/20">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight italic">Aliados Estrat&eacute;gicos</h3>
                  <p className="text-[10px] font-bold text-andina-text/40 uppercase tracking-widest font-mono">Consola de convenios corporativos</p>
                </div>
              </div>
            </div>

            {/* Desktop: Editorial Matrix */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/40">
                    <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Aliado Corporativo</th>
                    <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Convenio T&aacute;ctico</th>
                    <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Estado</th>
                    <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Volumen</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { boss: "Llantera El Sur", type: "Anualidad Oro", status: "Pagado", amount: "$1,200", brand: "Michelín" },
                    { boss: "Papelería Lojita", type: "PromoHub Trimestral", status: "Pendiente", amount: "$450", brand: "Útiles" },
                    { boss: "Seguros Andes", type: "Patrocinio Global", status: "Pagado", amount: "$3,500", brand: "Allianz" }
                  ].map((aliado, idx) => (
                    <tr key={idx} className="group hover:bg-white/5 transition-all duration-500">
                      <td className="px-8 py-6">
                        <p className="text-base font-black text-white group-hover:text-andina-primary transition-colors tracking-tight italic">{aliado.boss}</p>
                        <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mt-1 font-mono">{aliado.brand}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-black text-white/60 tracking-[0.1em] uppercase">{aliado.type}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${
                          aliado.status === "Pagado" ? "bg-andina-primary/10 text-andina-primary border-andina-primary/20" : "bg-andina-accent/10 text-andina-accent border-andina-accent/20"
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${aliado.status === "Pagado" ? 'bg-andina-primary animate-pulse' : 'bg-andina-accent'}`}></div>
                          {aliado.status}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-white font-mono tracking-tighter">{aliado.amount}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2.5 text-andina-text/20 hover:text-andina-primary bg-white/5 rounded-xl transition-all hover:scale-110 active:scale-90">
                           <ArrowUpRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: Alliance Deck */}
            <div className="md:hidden p-6 space-y-6">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="bg-black/30 border border-white/5 rounded-[2rem] p-6 space-y-4">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="text-[10px] font-black text-andina-primary uppercase tracking-widest mb-1 italic">Aliado Corporativo</p>
                          <h4 className="text-lg font-black text-white tracking-tight">Llantera El Sur</h4>
                       </div>
                       <div className="bg-andina-primary/10 text-andina-primary text-[8px] font-black px-3 py-1 rounded-full uppercase">PAGADO</div>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-4">
                       <div>
                          <p className="text-[9px] font-black text-andina-text/40 uppercase tracking-widest mb-1 font-mono">Volumen</p>
                          <p className="text-lg font-black text-white">$1,200</p>
                       </div>
                       <button className="p-2 bg-white/5 rounded-xl text-andina-primary"><ArrowUpRight size={18} /></button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Maintenance Fund Intelligence */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-andina-surface/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.1em] mb-10 flex items-center gap-3 italic">
              <PieChart size={18} className="text-andina-primary group-hover:rotate-45 transition-transform duration-700" />
              Destino T&aacute;ctico del Fondo
            </h3>
            <div className="space-y-10">
               <div className="relative h-4 bg-black/40 rounded-full overflow-hidden flex p-0.5 border border-white/10 shadow-inner">
                  <div className="h-full bg-andina-primary w-[60%] rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-1000" />
                  <div className="h-full bg-andina-accent w-[25%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)] mx-0.5" />
                  <div className="h-full bg-blue-500 w-[15%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
               </div>
               <div className="space-y-6">
                  {[
                    { label: "Seguros & Repuestos", val: "60%", color: "bg-andina-primary" },
                    { label: "Mantenimiento Preventivo", val: "25%", color: "bg-andina-accent" },
                    { label: "Fondo de Emergencia", val: "15%", color: "bg-blue-500" }
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between group/item">
                       <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg transition-transform group-hover/item:scale-125`} />
                          <span className="text-[10px] font-black text-andina-text/40 group-hover/item:text-white transition-colors uppercase tracking-widest">{item.label}</span>
                       </div>
                       <span className="text-lg font-black text-white tracking-tighter group-hover/item:text-andina-primary transition-colors">{item.val}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="mt-12 pt-10 border-t border-white/5">
               <p className="text-[10px] text-andina-text/20 font-black uppercase tracking-[0.3em] mb-6 text-center font-mono italic">Pr&oacute;ximo Desembolso Estrat&eacute;gico</p>
               <div className="p-8 bg-gradient-to-br from-[#0a140f] to-transparent border border-andina-primary/20 rounded-[2rem] shadow-2xl relative overflow-hidden group/box">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/box:rotate-12 transition-transform duration-700">
                    <ShieldCheck size={60} className="text-andina-primary" />
                  </div>
                  <p className="text-[10px] text-andina-text/40 font-black uppercase tracking-widest mb-2 font-mono italic">Total Participaci&oacute;n Socios</p>
                  <p className="text-4xl font-black text-white tracking-tighter group-hover/box:text-andina-primary transition-colors drop-shadow-lg">$5,500.00</p>
                  <div className="mt-6 flex items-center gap-2 text-[8px] font-black text-andina-primary uppercase tracking-[0.2em] bg-andina-primary/10 px-4 py-2 rounded-xl border border-andina-primary/20 w-fit">
                    <ShieldCheck size={14} className="animate-pulse" /> Validaci&oacute;n Auditada 14/04
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
