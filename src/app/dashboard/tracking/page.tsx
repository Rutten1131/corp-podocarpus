"use client";

import { UNIDADES_GPS } from "@/lib/mock-data";
import { Focus, Radio, Navigation, Maximize, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function TrackingPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  
  // Simulate live updates for the UI
  const [tick, setTick] = useState(0);
  useEffect(() => {
     const interval = setInterval(() => {
        setTick(t => t + 1);
     }, 2000);
     return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-lg">Centro de <span className="text-andina-primary">Monitoreo GPS</span></h2>
          <p className="text-andina-text/60 text-xs font-mono uppercase tracking-[0.2em] mt-1 font-bold italic">Sincronización Satelital Activa</p>
        </div>
        <div className="flex items-center gap-4">
           <div className={`flex items-center gap-3 px-5 py-2.5 bg-andina-primary/10 text-andina-primary rounded-xl border border-andina-primary/20 text-[10px] font-black uppercase tracking-widest transition-all ${tick % 2 === 0 ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}`}>
             <Radio size={16} className={tick % 2 === 0 ? 'animate-pulse' : ''} />
             {UNIDADES_GPS.filter(u => u.estado === 'en-ruta').length} Unidades en Operativa
           </div>
           <button className="p-3 bg-andina-surface border border-andina-border rounded-xl text-andina-text hover:bg-white/5 shadow-xl">
              <Maximize size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 rounded-[2.5rem] border border-white/10 overflow-hidden relative shadow-2xl bg-[#0a0f0d] flex">
         
         {/* MAPA SIMULADO (Estilo Dark Control Center) */}
         <div className="absolute inset-0 bg-[#070b09] overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  <pattern id="street-grid-dark" width="160" height="160" patternUnits="userSpaceOnUse">
                     <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                     <path d="M 80 0 L 80 160 M 0 80 L 160 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                  </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#street-grid-dark)" />
               {/* Simular avenidas principales con luz neon t&aacute;ctica */}
               <path d="M 0 400 L 2000 400 M 600 0 L 600 1200" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="6" fill="none" />
            </svg>
            
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(34,197,94,0.03)_0%, transparent_70%) pointer-events-none"></div>

            {/* Marcadores de GPS: Estilo Premium Neon */}
            {UNIDADES_GPS.map((unidad, index) => {
               let addedLat = 0;
               let addedLng = 0;
               if (unidad.estado === 'en-ruta') {
                  const speed = unidad.velocidad / 100;
                  addedLat = Math.sin(tick * speed + index) * 0.003;
                  addedLng = Math.cos(tick * speed + index) * 0.003;
               }

               const topPos = 50 + (unidad.lat + addedLat + 4.00) * 1500;
               const leftPos = 50 + (unidad.lng + addedLng + 79.20) * 1500;
               
               const isSelected = activeUnit === unidad.id;
               
               return (
                  <div 
                     key={unidad.id}
                     onClick={() => setActiveUnit(unidad.id)}
                     className={`absolute w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-125 z-20 ${isSelected ? 'z-40' : ''}`}
                     style={{ 
                        top: `${topPos}%`, 
                        left: `${leftPos}%`, 
                        transitionDuration: '2000ms', 
                        transitionTimingFunction: 'linear' 
                     }}
                  >
                     {/* Pulse aura for active units */}
                     {unidad.estado === 'en-ruta' && (
                        <div className="absolute inset-0 bg-andina-primary/20 rounded-full animate-ping opacity-40"></div>
                     )}
                     
                     <div className={`relative flex items-center justify-center transition-all duration-500 ${isSelected ? 'scale-125' : 'scale-100'}`}>
                        <div 
                           className={`relative z-10 rounded-2xl border-2 border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-white transition-all duration-700
                           ${unidad.estado === 'en-ruta' ? 'bg-andina-primary w-10 h-10 shadow-andina-primary/40' : 
                             unidad.estado === 'detenido' ? 'bg-andina-accent w-9 h-9 shadow-andina-accent/40' : 'bg-andina-surface w-9 h-9 border-white/5'}`}
                           style={{
                              transform: `rotate(${unidad.estado === 'en-ruta' ? (Math.sin(tick + index) * 30) : 0}deg)`,
                              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                           }}
                        >
                           <Navigation size={isSelected ? 22 : 18} className={unidad.estado === 'en-ruta' ? 'drop-shadow-lg' : 'opacity-60'} />
                        </div>
                     </div>
                     
                     <div className={`mt-2 px-3 py-1 rounded-xl text-[10px] font-black shadow-2xl border backdrop-blur-md transition-all ${isSelected ? 'bg-andina-primary border-andina-primary text-white scale-110 shadow-andina-primary/30' : 'bg-andina-surface/90 border-white/10 text-andina-text'}`}>
                        {unidad.placa}
                     </div>
                  </div>
               )
            })}
         </div>

         {/* PANEL DE CONTROL: Responsivo (Lateral en MD, Inferior en Movil) */}
         <div className={`absolute transition-all duration-700 z-50 overflow-hidden
            md:right-6 md:top-6 md:bottom-6 md:w-96 md:rounded-[2rem]
            bottom-0 left-0 right-0 w-full rounded-t-[2.5rem]
            bg-andina-surface/80 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col
            ${isPanelOpen ? 'md:translate-x-0 h-[60%] md:h-auto' : 'md:translate-x-[calc(100%+2rem)] h-20'}
         `}>
            <div className="p-6 border-b border-white/5 flex justify-between items-center cursor-pointer md:cursor-default" onClick={() => !window.matchMedia('(min-width: 768px)').matches && setIsPanelOpen(!isPanelOpen)}>
               <div>
                  <h4 className="font-heading font-black text-white tracking-tighter text-lg">Flota Operativa</h4>
                  <p className="text-[10px] text-andina-text/40 font-black uppercase tracking-widest">{UNIDADES_GPS.length} Terminales en Red</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-andina-primary/10 text-andina-primary flex items-center justify-center border border-andina-primary/20">
                     <Focus size={18} />
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setIsPanelOpen(!isPanelOpen); }} className="p-2 text-andina-text hover:text-white transition-all hidden md:block">
                    <Maximize size={20} className={isPanelOpen ? 'rotate-180' : ''} />
                  </button>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
               {UNIDADES_GPS.map(unidad => {
                  const isActive = activeUnit === unidad.id;
                  return (
                     <div 
                        key={unidad.id} 
                        onClick={() => setActiveUnit(unidad.id)}
                        className={`p-5 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${isActive ? 'bg-andina-primary/10 border-andina-primary/40 shadow-xl' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                     >
                        <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-3">
                              <span className="font-black text-white text-lg tracking-tighter">{unidad.placa}</span>
                              <div className={`w-2.5 h-2.5 rounded-full ${unidad.estado === 'en-ruta' ? 'bg-andina-primary shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse' : unidad.estado === 'detenido' ? 'bg-andina-accent' : 'bg-white/20'}`}></div>
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-andina-text/40">{unidad.id}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                              <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1 font-mono">Velocidad</p>
                              <p className={`text-2xl font-black tracking-tighter ${unidad.velocidad > 60 ? 'text-andina-accent' : 'text-white'}`}>{unidad.velocidad} <span className="text-[10px] font-bold text-andina-text/40 tracking-normal italic uppercase">km/h</span></p>
                           </div>
                           <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                              <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1 font-mono">Batería/Fuel</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                 <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-1000 ${unidad.combustible < 20 ? 'bg-andina-accent' : 'bg-andina-primary'}`} style={{ width: `${unidad.combustible}%`}}></div>
                                 </div>
                                 <span className="text-[10px] font-black text-white font-mono">{unidad.combustible}%</span>
                              </div>
                           </div>
                        </div>

                        {isActive && (
                           <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                              <div className="flex items-center gap-2 text-[9px] text-andina-text/40 font-black uppercase tracking-widest">
                                 <Clock size={12} className="text-andina-primary" />
                                 Sinc: {unidad.ultimaAct}
                              </div>
                              <button className="text-[9px] font-black uppercase tracking-[0.2em] text-andina-primary hover:text-white transition-all bg-andina-primary/10 px-3 py-1.5 rounded-lg border border-andina-primary/20">
                                 Historial Rutas &rarr;
                              </button>
                           </div>
                        )}
                     </div>
                  )
               })}
            </div>
         </div>
         
         {/* Leyenda Inferior Glass */}
         <div className="hidden md:flex absolute bottom-6 left-6 bg-andina-surface/60 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl items-center gap-8 z-40">
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-andina-primary shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-andina-text">Operativo</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-andina-accent shadow-[0_0_12px_rgba(110,231,183,0.6)]"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-andina-text">Inactivo</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-white/20"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-andina-text">Desconectado</span>
            </div>
         </div>

      </div>
    </div>
  );
}
