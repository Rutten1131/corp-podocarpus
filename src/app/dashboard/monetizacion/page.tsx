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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-heading font-black text-white tracking-tighter uppercase">
          Monetización & Alianzas
        </h1>
        <p className="text-andina-text/50 font-mono text-xs uppercase tracking-widest mt-1">
          Gestión de Ingresos Extra-Operativos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-andina-surface border border-andina-border rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <stat.icon size={48} className="text-andina-primary" />
            </div>
            <p className="text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-2xl font-heading font-black text-white mb-2">{stat.value}</h3>
            <div className="flex items-center gap-1.5">
              {stat.type === "up" ? <ArrowUpRight size={14} className="text-andina-primary" /> : <ArrowDownRight size={14} className="text-andina-accent" />}
              <span className={`text-[10px] font-bold ${stat.type === "up" ? "text-andina-primary" : "text-andina-accent"}`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Management of Promoters */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-andina-surface border border-andina-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Briefcase size={18} className="text-andina-primary" />
                Gestión de Promotores (Aliados)
              </h3>
              <button className="bg-andina-primary/10 border border-andina-primary/30 px-4 py-2 rounded-xl text-xs font-bold text-andina-primary hover:bg-andina-primary hover:text-white transition-all">
                + Nuevo Convenio
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-andina-border">
                    <th className="pb-4 text-[10px] font-mono text-andina-text/40 uppercase tracking-widest">Aliado / Empresa</th>
                    <th className="pb-4 text-[10px] font-mono text-andina-text/40 uppercase tracking-widest">Convenio</th>
                    <th className="pb-4 text-[10px] font-mono text-andina-text/40 uppercase tracking-widest">Estado</th>
                    <th className="pb-4 text-[10px] font-mono text-andina-text/40 uppercase tracking-widest">Recaudado</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-andina-border">
                  {[
                    { boss: "Llantera El Sur", type: "Anualidad Oro", status: "Pagado", amount: "$1,200", brand: "Michelín" },
                    { boss: "Papelería Lojita", type: "PromoHub Trimestral", status: "Pendiente", amount: "$450", brand: "Útiles" },
                    { boss: "Seguros Andes", type: "Patrocinio Global", status: "Pagado", amount: "$3,500", brand: "Allianz" }
                  ].map((aliado, idx) => (
                    <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4">
                        <p className="text-sm font-bold text-white">{aliado.boss}</p>
                        <p className="text-[10px] text-andina-text/40 font-mono uppercase">{aliado.brand}</p>
                      </td>
                      <td className="py-4 font-mono text-xs text-andina-text/60">{aliado.type}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${aliado.status === "Pagado" ? "bg-andina-primary/10 text-andina-primary" : "bg-andina-accent/10 text-andina-accent"}`}>
                          {aliado.status}
                        </span>
                      </td>
                      <td className="py-4 font-mono text-xs text-white">{aliado.amount}</td>
                      <td className="py-4 text-right">
                        <button className="text-andina-primary/40 hover:text-andina-primary transition-colors"><ArrowUpRight size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Maintenance Fund Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-andina-surface border border-andina-border rounded-2xl p-6">
            <h3 className="text-white font-bold flex items-center gap-2 mb-6">
              <PieChart size={18} className="text-andina-primary" />
              Destino del Fondo
            </h3>
            <div className="space-y-6">
               <div className="relative h-4 bg-andina-bg rounded-full overflow-hidden flex">
                  <div className="h-full bg-andina-primary w-[60%]" />
                  <div className="h-full bg-andina-accent w-[25%]" />
                  <div className="h-full bg-blue-500 w-[15%]" />
               </div>
               <div className="space-y-3">
                  {[
                    { label: "Seguros & Repuestos", val: "60%", color: "bg-andina-primary" },
                    { label: "Mantenimiento Preventivo", val: "25%", color: "bg-andina-accent" },
                    { label: "Fondo de Emergencia", val: "15%", color: "bg-blue-500" }
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span className="text-xs text-andina-text/60">{item.label}</span>
                       </div>
                       <span className="text-xs font-mono text-white">{item.val}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="mt-8 pt-8 border-t border-andina-border">
               <p className="text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-4">Próximo Desembolso</p>
               <div className="p-4 bg-andina-bg border border-andina-border rounded-xl">
                  <p className="text-xs text-andina-text/60 mb-1">Total a repartir entre 74 socios:</p>
                  <p className="text-2xl font-heading font-black text-andina-primary">$5,500.00</p>
                  <p className="text-[10px] text-andina-accent font-mono mt-2 flex items-center gap-2">
                     <ShieldCheck size={12} />
                     Validado por Auditoría 14/04
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
