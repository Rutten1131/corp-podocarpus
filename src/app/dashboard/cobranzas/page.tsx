"use client";

import { PAGOS } from "@/lib/mock-data";
import { Search, Download, Filter, MoreHorizontal, CheckCircle2, AlertCircle, Clock, MessageCircle } from "lucide-react";

export default function CobranzasPage() {
  const pagados = PAGOS.filter(p => p.estado === "pagado").length;
  const pendientes = PAGOS.filter(p => p.estado === "pendiente").length;
  const vencidos = PAGOS.filter(p => p.estado === "vencido").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-lg">Gestión de <span className="text-andina-primary">Recaudación</span></h2>
          <p className="text-andina-text/60 text-xs font-mono uppercase tracking-[0.2em] mt-1 font-bold">Seguimiento de pensiones y cartera vencida</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-andina-surface border border-andina-border px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-andina-text hover:bg-white/5 transition-all shadow-xl">
            <Filter size={16} className="text-andina-primary" /> Filtros
          </button>
          <button className="flex items-center gap-2 bg-andina-surface border border-andina-border px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-andina-text hover:bg-white/5 transition-all shadow-xl">
            <Download size={16} className="text-andina-primary" /> Reporte
          </button>
        </div>
      </div>

      {/* Resumen de Recaudación: Premium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-andina-surface/40 backdrop-blur-xl border border-andina-primary/20 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-andina-primary/5 group-hover:scale-110 transition-transform duration-700">
             <CheckCircle2 size={100} />
          </div>
          <p className="text-andina-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1 font-mono">Recaudado (Abril)</p>
          <p className="text-4xl font-black text-white tracking-tighter drop-shadow-md">{pagados} <span className="text-xs font-bold text-andina-text/40 tracking-normal">Alumnos</span></p>
        </div>
        
        <div className="bg-andina-surface/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <p className="text-andina-text/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1 font-mono">Pendientes de Pago</p>
          <p className="text-4xl font-black text-white tracking-tighter drop-shadow-md">{pendientes} <span className="text-xs font-bold text-andina-text/40 tracking-normal">En Proceso</span></p>
        </div>

        <div className={`bg-andina-surface/40 backdrop-blur-xl border p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group transition-all ${vencidos > 0 ? 'border-andina-accent/40 bg-andina-accent/5' : 'border-white/5'}`}>
          <div className="absolute -right-4 -top-4 text-andina-accent/5 group-hover:scale-110 transition-transform duration-700">
             <AlertCircle size={100} />
          </div>
          <p className={`${vencidos > 0 ? 'text-andina-accent' : 'text-andina-text/60'} text-[10px] font-black uppercase tracking-[0.2em] mb-1 font-mono`}>Cartera Vencida</p>
          <p className="text-4xl font-black text-white tracking-tighter drop-shadow-md">{vencidos} <span className="text-xs font-bold text-andina-text/40 tracking-normal">Mora Crítica</span></p>
        </div>
      </div>

      <div className="bg-andina-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-andina-primary" />
            <input
              type="text"
              placeholder="Buscar estudiante, padre o placa..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-black/20 border border-white/10 text-sm font-bold text-white focus:outline-none focus:border-andina-primary transition-all placeholder:text-white/10"
            />
          </div>
          <select className="px-6 py-4 bg-andina-surface border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-andina-primary cursor-pointer transition-all">
             <option>Período: Abril 2026</option>
             <option>Período: Marzo 2026</option>
          </select>
        </div>

        {/* Desktop View: Editorial Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-andina-text/40 font-black uppercase tracking-widest text-[9px] border-b border-white/10">
              <tr>
                <th className="px-8 py-5">Estudiante / Representante</th>
                <th className="px-8 py-5">Unidad</th>
                <th className="px-8 py-5">Monto</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5">Transacción</th>
                <th className="px-8 py-5 text-right">Notificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PAGOS.map((pago) => (
                <tr key={pago.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-white text-base tracking-tight">{pago.estudiante}</span>
                      <span className="text-[10px] font-bold text-andina-text/40 uppercase tracking-widest mt-1">Padre: {pago.padre}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black text-andina-text/60 font-mono">
                      {pago.socioId.replace("S00", "U-0")}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg font-black text-white tracking-tighter">${pago.monto.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest shadow-lg ${
                        pago.estado === "pagado" ? "bg-andina-primary/10 text-andina-primary border-andina-primary/20" : 
                        pago.estado === "pendiente" ? "bg-white/5 text-andina-text/60 border-white/10" :
                        "bg-andina-accent/10 text-andina-accent border-andina-accent/20"
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${pago.estado === "pagado" ? 'bg-andina-primary' : pago.estado === 'pendiente' ? 'bg-white/40' : 'bg-andina-accent'}`}></div>
                      {pago.estado}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {pago.fechaPago ? (
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{pago.fechaPago}</span>
                        <span className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mt-0.5">{pago.metodo}</span>
                      </div>
                    ) : (
                      <span className="text-andina-text/20 italic font-mono text-xs">Pérdida de señal...</span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    {pago.estado !== "pagado" ? (
                      <button className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 px-4 py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#25D366]/10">
                        <MessageCircle size={14} />
                        Recordatorio
                      </button>
                    ) : (
                       <button className="p-2 text-andina-text/40 hover:text-white transition-all">
                        <MoreHorizontal size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards Stack */}
        <div className="lg:hidden p-4 space-y-4">
           {PAGOS.map((pago) => (
             <div key={pago.id} className="bg-white/5 border border-white/5 rounded-3xl p-6 relative overflow-hidden active:scale-[0.98] transition-transform">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h4 className="text-lg font-black text-white tracking-tight">{pago.estudiante}</h4>
                      <p className="text-[10px] font-black text-andina-text/40 uppercase tracking-widest mt-1">Unidad {pago.socioId.replace("S00", "U-0")}</p>
                   </div>
                   <div className={`px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${
                      pago.estado === "pagado" ? "bg-andina-primary/10 text-andina-primary border-andina-primary/20" : 
                      pago.estado === "pendiente" ? "bg-white/5 text-andina-text/60 border-white/10" :
                      "bg-andina-accent/10 text-andina-accent border-andina-accent/20"
                   }`}>
                      {pago.estado}
                   </div>
                </div>

                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-[10px] text-andina-text/40 font-black uppercase tracking-widest mb-1">Monto Pensión</p>
                      <p className="text-2xl font-black text-white tracking-tighter">${pago.monto.toFixed(2)}</p>
                   </div>
                   {pago.estado !== "pagado" && (
                      <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-[#25D366] text-white px-5 py-3 rounded-2xl shadow-xl shadow-[#25D366]/20 active:scale-95 transition-all">
                        <MessageCircle size={16} /> WhatsApp
                      </button>
                   )}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
