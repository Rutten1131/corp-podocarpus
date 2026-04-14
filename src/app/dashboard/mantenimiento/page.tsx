"use client";

import { AlertTriangle, CheckCircle2, ChevronRight, Plus, Receipt, Settings2, Wrench } from "lucide-react";

const HISTORIAL = [
  { id: "M01", fecha: "Ayer", tipo: "Cambio de Aceite", kms: "85,400 km", costo: "$85.00", estado: "completado" },
  { id: "M02", fecha: "2 Ene 2026", tipo: "Rotación Llantas", kms: "79,100 km", costo: "$40.00", estado: "completado" },
  { id: "M03", fecha: "15 Oct 2025", tipo: "Mantenimiento Frenos", kms: "72,800 km", costo: "$140.00", estado: "completado" },
  { id: "M04", fecha: "03 Ago 2025", tipo: "Revisión Corposan", kms: "65,300 km", costo: "$25.00", estado: "completado" },
];export default function MantenimientoPage() {
  return (
    <div className="space-y-8 max-w-6xl">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
           <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-lg">Salud de la <span className="text-andina-primary">Flota</span></h2>
           <p className="text-andina-text/60 text-xs font-mono uppercase tracking-[0.2em] mt-1 font-bold">Control de depreciación, kilometraje y gastos</p>
         </div>
         <div className="flex items-center gap-4">
           <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-andina-primary text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-andina-primary/20 hover:bg-andina-primary/90 transition-all active:scale-95">
             <Plus size={18} />
             Registrar Gasto
           </button>
         </div>
       </div>

       {/* Panel de Alertas y KM: Command Center Style */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0a0f0d] border border-andina-primary/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute -right-12 -bottom-12 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none text-andina-primary">
                <Settings2 size={240} />
             </div>
             <p className="text-andina-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono italic">Unidad Operativa Activa</p>
             <h3 className="text-4xl font-black text-white tracking-tighter mb-1 drop-shadow-xl">Hyundai County</h3>
             <p className="text-andina-text/40 font-black uppercase text-xs tracking-widest mb-10">LAA-0123 • <span className="text-andina-primary">Unidad 01</span></p>

             <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
                  <p className="text-[10px] text-andina-text/40 font-black uppercase tracking-widest mb-2 font-mono">Kilometraje Total</p>
                  <p className="text-3xl font-black text-white tracking-tighter">85,420 <span className="text-xs font-bold text-andina-primary uppercase tracking-widest">km</span></p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
                  <p className="text-[10px] text-andina-text/40 font-black uppercase tracking-widest mb-2 font-mono">Inversión (Mensual)</p>
                  <p className="text-3xl font-black text-andina-accent tracking-tighter">$125.00</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
             {/* Próximo Cambio de Aceite: Glass Alert */}
             <div className="bg-andina-surface/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-andina-accent/20 shadow-xl flex items-start gap-6 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-24 h-24 bg-andina-accent/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="w-14 h-14 rounded-2xl bg-andina-accent/10 text-andina-accent flex items-center justify-center border border-andina-accent/20 shadow-lg shadow-andina-accent/10">
                   <AlertTriangle size={28} />
                </div>
                <div className="flex-1 relative z-10">
                   <h4 className="font-black text-white text-lg tracking-tight">Servicio Preventivo: Aceite</h4>
                   <p className="text-[11px] font-bold text-andina-text/60 mt-1 uppercase tracking-widest">Objetivo: <span className="text-white">89,000 km</span> (Faltan ~3,580 km)</p>
                   <div className="w-full bg-black/40 rounded-full h-2.5 mt-4 overflow-hidden p-0.5 border border-white/5">
                      <div className="bg-andina-accent h-full rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-1000" style={{ width: '85%' }}></div>
                   </div>
                </div>
             </div>

             {/* Matricula / Seguros: Positive Flow */}
             <div className="bg-andina-surface/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/5 shadow-xl flex items-start gap-6 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-andina-primary/10 text-andina-primary flex items-center justify-center border border-andina-primary/20 shadow-lg shadow-andina-primary/10">
                   <CheckCircle2 size={28} />
                </div>
                <div className="flex-1">
                   <h4 className="font-black text-white text-lg tracking-tight">Legal y Documentación</h4>
                   <p className="text-[11px] font-bold text-andina-text/60 mt-1 uppercase tracking-widest">Estatus: <span className="text-andina-primary font-black">Vigente</span> • Revisión: Mar 2027</p>
                </div>
             </div>
          </div>
       </div>

       {/* Historial de Mantenimientos: Editorial Log */}
       <div className="bg-andina-surface/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
             <div>
                <h3 className="text-xl font-heading font-black text-white tracking-tighter uppercase tracking-[0.05em]">Bitácora de Ingeniería</h3>
                <p className="text-[10px] text-andina-text/40 font-black uppercase tracking-[0.2em] mt-1 font-mono italic">Registro integral de reparaciones y repuestos</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-andina-primary/10 border border-andina-primary/20 flex items-center justify-center text-andina-primary shadow-xl">
                <Receipt size={24} />
             </div>
          </div>
          
          <div className="divide-y divide-white/5">
             {HISTORIAL.map((item, i) => (
                <div key={i} className="p-6 hover:bg-white/5 transition-all group flex items-center justify-between cursor-pointer">
                   <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${item.id === 'M01' ? 'bg-andina-primary/10 text-andina-primary border-andina-primary/20 shadow-lg shadow-andina-primary/10 group-hover:scale-105' : 'bg-white/5 text-andina-text/40 border-white/5'}`}>
                         <Wrench size={22} />
                      </div>
                      <div>
                         <p className="font-black text-white text-lg tracking-tight group-hover:text-andina-primary transition-colors">{item.tipo}</p>
                         <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] mt-1.5 font-mono">
                            <span className="text-andina-primary">{item.kms}</span>
                            <span className="text-white/10">•</span>
                            <span className="text-andina-text/40">{item.fecha}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-8">
                     <span className="text-xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">{item.costo}</span>
                     <div className="p-3 rounded-xl bg-white/5 text-andina-text/20 group-hover:text-white group-hover:bg-andina-primary/20 transition-all">
                        <ChevronRight size={20} />
                     </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
