"use client";

import { SOCIOS } from "@/lib/mock-data";
import { Search, Plus, Filter, MoreVertical, ShieldAlert, CheckCircle2, X, ArrowLeft } from "lucide-react";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SociosPageContent() {
  const [selectedSocio, setSelectedSocio] = useState<any>(null);
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'socio';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link 
            href={`/dashboard?role=${role}`}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-andina-text hover:bg-andina-primary/20 hover:text-andina-primary transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-lg"> Directivo de <span className="text-andina-primary">Socios</span></h2>
            <p className="text-andina-text/80 text-xs font-mono uppercase tracking-[0.2em] mt-1 font-bold">Gestión de conductores y padrón cooperativo</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-andina-surface border border-andina-border px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-andina-text hover:bg-white/5 transition-all shadow-xl">
            <Filter size={16} className="text-andina-primary" />
            <span>Filtros</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-andina-primary hover:bg-andina-primary/90 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-andina-primary/20 active:scale-95">
            <Plus size={16} />
            <span>Nuevo Socio</span>
          </button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-andina-text/40 group-focus-within:text-andina-primary transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nombre, unidad o placa..."
          className="w-full bg-andina-surface/40 border border-andina-border rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-andina-primary/50 focus:bg-andina-surface/60 transition-all font-medium"
        />
      </div>

      <div className="bg-andina-surface/40 backdrop-blur-xl border border-andina-border rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Table View: Desktop & Tablet */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-5 text-[10px] font-black text-andina-primary uppercase tracking-[0.3em]">Socio / Unidad</th>
                <th className="px-6 py-5 text-[10px] font-black text-andina-primary uppercase tracking-[0.3em]">Identificación</th>
                <th className="px-6 py-5 text-[10px] font-black text-andina-primary uppercase tracking-[0.3em]">Estatus Pago</th>
                <th className="px-6 py-5 text-[10px] font-black text-andina-primary uppercase tracking-[0.3em]">Mantenimiento</th>
                <th className="px-6 py-5 text-[10px] font-black text-andina-primary uppercase tracking-[0.3em] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SOCIOS.map((socio) => (
                <tr 
                  key={socio.id} 
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                  onClick={() => setSelectedSocio(socio)}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-andina-surface border border-white/10 flex items-center justify-center text-xl font-black text-andina-primary group-hover:scale-110 transition-transform">
                        {socio.foto}
                      </div>
                      <div>
                        <p className="font-black text-white tracking-tight leading-none mb-1.5">{socio.nombre}</p>
                        <p className="text-[10px] text-andina-text/40 font-mono font-bold uppercase tracking-widest">{socio.unidad}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-white mb-1">{socio.placa}</p>
                    <p className="text-[10px] text-andina-text/40 font-mono">{socio.cedula}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      socio.estadoPago === 'al dia' 
                        ? 'bg-andina-primary/10 text-andina-primary border-andina-primary/20' 
                        : 'bg-andina-accent/10 text-andina-accent border-andina-accent/20'
                    }`}>
                      {socio.estadoPago}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-[10px] text-andina-text/60 font-medium">Próximo: {socio.proximoMantenimiento}</p>
                      <div className="h-1 bg-white/5 rounded-full w-24 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${new Date(socio.proximoMantenimiento) < new Date('2026-04-18') ? 'bg-[#FF4D4D]' : 'bg-andina-primary'}`} 
                          style={{ width: '60%' }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-andina-text/40 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View: Mobile Only */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-6">
          {SOCIOS.map((socio) => (
            <div 
              key={socio.id} 
              onClick={() => setSelectedSocio(socio)}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-andina-surface border border-white/10 flex items-center justify-center text-xl font-black text-andina-primary">
                  {socio.foto}
                </div>
                <div>
                  <p className="font-black text-white leading-tight">{socio.nombre}</p>
                  <p className="text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mt-1">{socio.unidad} • {socio.placa}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                  socio.estadoPago === 'al dia' 
                    ? 'bg-andina-primary/10 text-andina-primary border-andina-primary/20' 
                    : 'bg-andina-accent/10 text-andina-accent border-andina-accent/20'
                }`}>
                  {socio.estadoPago}
                </span>
                <span className="text-[9px] font-mono text-andina-text/60">Proxy: {socio.proximoMantenimiento}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Modal: Ultra Premium Glassmorphism */}
      <AnimatePresence>
        {selectedSocio && (
          <div className="fixed inset-0 z-50 flex justify-end p-0 md:p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-md" 
               onClick={() => setSelectedSocio(null)}
            />
            
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-andina-surface/80 backdrop-blur-3xl border-l md:border border-white/10 md:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-start bg-andina-primary/5">
                 <div className="flex gap-6 items-center">
                    <div className="w-20 h-20 rounded-3xl bg-andina-surface flex items-center justify-center text-3xl text-andina-primary font-black shrink-0 shadow-2xl border border-white/10 group-hover:rotate-3 transition-transform">
                      {selectedSocio.foto}
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-white text-2xl tracking-tighter leading-none">{selectedSocio.nombre}</h3>
                      <p className="text-sm text-andina-primary font-mono mt-2 font-bold uppercase tracking-widest">{selectedSocio.unidad} • {selectedSocio.placa}</p>
                    </div>
                 </div>
                 <button 
                    onClick={() => setSelectedSocio(null)}
                    className="p-3 bg-white/5 text-andina-text/40 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                 >
                    <X size={24} />
                 </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 space-y-8">
                 <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                      <h4 className="text-[10px] font-black text-andina-primary uppercase tracking-[0.2em] mb-4">Información de Contacto</h4>
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-white flex justify-between">Cédula: <span className="text-andina-text font-mono font-medium">{selectedSocio.cedula}</span></p>
                        <p className="text-sm font-bold text-white flex justify-between">Teléfono: <span className="text-andina-text font-mono font-medium">{selectedSocio.telefono}</span></p>
                        <p className="text-sm font-bold text-white flex justify-between">Email: <span className="text-andina-text font-mono font-medium lowercase italic">{selectedSocio.email}</span></p>
                      </div>
                    </div>

                    <div className="p-5 bg-andina-primary/5 rounded-2xl border border-andina-primary/10">
                      <h4 className="text-[10px] font-black text-andina-primary uppercase tracking-[0.2em] mb-4">Estatus Técnico</h4>
                      <p className="text-lg font-black text-white mb-1">{selectedSocio.marca} {selectedSocio.modelo}</p>
                      <p className="text-xs font-bold text-andina-text/80 tracking-wide">Ruta actual: {selectedSocio.ruta}</p>
                      <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/10">
                         <span className="text-[10px] font-black uppercase text-andina-text/40">Mantenimiento</span>
                         {new Date(selectedSocio.proximoMantenimiento) < new Date("2026-04-18") ? (
                            <span className="text-xs font-black text-[#FF4D4D] flex items-center gap-2 bg-[#FF4D4D]/10 px-3 py-1.5 rounded-lg border border-[#FF4D4D]/20"><ShieldAlert size={14}/> REVISIÓN HOY</span>
                         ) : (
                            <span className="text-xs font-black text-andina-primary flex items-center gap-2 bg-andina-primary/10 px-3 py-1.5 rounded-lg border border-andina-primary/20"><CheckCircle2 size={14}/> AL DÍA</span>
                         )}
                      </div>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-[10px] font-black text-andina-text/40 uppercase tracking-[0.2em] mb-4 indent-1">Balance Mensual</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-andina-primary border border-andina-primary/20 p-5 rounded-3xl shadow-xl shadow-andina-primary/10">
                          <p className="text-[9px] uppercase font-black text-white/60 mb-1">Ingresos Base</p>
                          <p className="text-2xl font-black text-white tracking-tighter">${selectedSocio.ingresoMensual}</p>
                       </div>
                       <div className="bg-andina-surface border border-white/5 p-5 rounded-3xl shadow-xl">
                          <p className="text-[9px] uppercase font-black text-andina-text/40 mb-1">Operación</p>
                          <p className="text-2xl font-black text-white tracking-tighter">${selectedSocio.gastoMensual}</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 flex flex-col gap-3">
                    <button className="w-full bg-andina-primary hover:bg-andina-primary/90 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-andina-primary/20 active:scale-95">
                       Ver Expediente Completo
                    </button>
                    <button className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all border border-white/10">
                       Editar Datos
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SociosPage() {
  return (
    <Suspense fallback={
       <div className="h-96 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-andina-primary/20 border-t-andina-primary rounded-full animate-spin"></div>
       </div>
    }>
      <SociosPageContent />
    </Suspense>
  );
}
