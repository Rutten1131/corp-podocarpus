"use client";

import { RUTAS } from "@/lib/mock-data";
import { Flag, MapPin, Navigation, Clock, Users, ArrowRight, Route } from "lucide-react";

export default function RutasPage() {
  const miRuta = RUTAS[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-lg">Mi Hoja de <span className="text-andina-primary">Ruta</span></h2>
          <p className="text-andina-text/60 text-xs font-mono uppercase tracking-[0.2em] mt-1 font-bold">Despacho diario y control de paradas</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-andina-primary hover:bg-andina-primary/90 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-andina-primary/20 active:scale-95 group">
            <Navigation size={18} className="group-hover:rotate-12 transition-transform" />
            <span>Iniciar Recorrido</span>
          </button>
        </div>
      </div>

      {/* Info General de la Ruta: Apple Card Style */}
      <div className="bg-andina-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <Route size={150} />
         </div>
         
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-andina-primary/10 rounded-2xl flex items-center justify-center text-andina-primary border border-andina-primary/20 shadow-xl">
               <Route size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white tracking-tighter drop-shadow-md">{miRuta.nombre}</h3>
               <p className="text-andina-primary text-[10px] font-black uppercase tracking-[0.3em] mt-1 font-mono italic">{miRuta.colegio}</p>
            </div>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full xl:w-auto relative z-10">
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
               <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1.5 font-mono">Salida</p>
               <p className="font-black text-white text-xl flex items-center gap-2 drop-shadow-sm leading-none"><Clock size={16} className="text-andina-primary"/>{miRuta.horaSalida}</p>
            </div>
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
               <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1.5 font-mono">Llegada</p>
               <p className="font-black text-white text-xl flex items-center gap-2 drop-shadow-sm leading-none"><Flag size={16} className="text-andina-accent"/>{miRuta.horaLlegada}</p>
            </div>
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
               <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1.5 font-mono">Pasajeros</p>
               <p className="font-black text-white text-xl flex items-center gap-2 drop-shadow-sm leading-none"><Users size={16} className="text-andina-primary"/>28 <span className="text-[9px] text-andina-text/40 font-bold uppercase tracking-widest font-mono">Cap</span></p>
            </div>
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
               <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1.5 font-mono">Paradas</p>
               <p className="font-black text-white text-xl flex items-center gap-2 drop-shadow-sm leading-none"><MapPin size={16} className="text-andina-primary"/>{miRuta.paradas}</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Lista de Paradas: Editorial Timeline */}
         <div className="bg-andina-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 border-b border-white/5 bg-white/5">
               <h3 className="text-xl font-heading font-black text-white tracking-tighter uppercase tracking-[0.05em]">Itinerario Detallado</h3>
            </div>
            <div className="p-8 flex-1">
               <div className="relative pl-10 space-y-10 before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-andina-primary before:via-white/10 before:to-transparent">
                  
                  {/* Stop Item: Current */}
                  <div className="relative group">
                     <div className="absolute left-[-34px] top-1 w-7 h-7 rounded-2xl bg-andina-primary border-4 border-[#0a140f] z-10 flex items-center justify-center shadow-lg shadow-andina-primary/20 transition-transform group-hover:scale-110">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     </div>
                     <div>
                        <span className="text-[10px] font-black text-andina-primary bg-andina-primary/10 px-3 py-1 rounded-lg border border-andina-primary/20 uppercase tracking-widest font-mono">06:30 AM • Actual</span>
                        <h4 className="text-lg font-black text-white mt-2 tracking-tight transition-colors group-hover:text-andina-primary">Inicio de Ruta (La Argelia)</h4>
                        <p className="text-[11px] font-bold text-andina-text/40 mt-1 uppercase tracking-widest">Base principal despacho UNL.</p>
                     </div>
                  </div>
                  
                  {/* Stop Item: Upcoming */}
                  <div className="relative group">
                     <div className="absolute left-[-34px] top-1 w-7 h-7 rounded-2xl bg-[#0a140f] border-2 border-andina-primary z-10 flex items-center justify-center transition-transform group-hover:scale-110">
                        <div className="w-1.5 h-1.5 bg-andina-primary rounded-full animate-pulse"></div>
                     </div>
                     <div>
                        <span className="text-[10px] font-black text-andina-text/40 uppercase tracking-widest font-mono italic">06:38 AM</span>
                        <h4 className="text-lg font-black text-white mt-2 tracking-tight group-hover:text-andina-primary transition-colors">Redondel del Soldado</h4>
                        <div className="mt-3 bg-black/30 rounded-2xl p-4 border border-white/5 flex justify-between items-center group-hover:border-andina-primary/20 transition-colors">
                           <div className="flex -space-x-3">
                              {[1, 2].map(i => (
                                <img key={i} className="w-8 h-8 rounded-xl border-2 border-[#1a1a1a] shadow-xl" src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} />
                              ))}
                           </div>
                           <span className="text-[10px] font-black text-andina-text/60 uppercase tracking-widest indent-2">2 Estudiantes en espera</span>
                        </div>
                     </div>
                  </div>

                  <div className="relative group">
                     <div className="absolute left-[-34px] top-1 w-7 h-7 rounded-2xl bg-[#0a140f] border-2 border-andina-primary z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-andina-primary rounded-full"></div>
                     </div>
                     <div>
                        <span className="text-[10px] font-black text-andina-text/40 uppercase tracking-widest font-mono">06:45 AM</span>
                        <h4 className="text-lg font-black text-white mt-2 tracking-tight group-hover:text-andina-primary transition-colors">Supermaxi SUR</h4>
                        <div className="mt-3 bg-black/30 rounded-2xl p-4 border border-white/5 flex justify-between items-center group-hover:border-andina-primary/20 transition-colors">
                           <div className="flex -space-x-3">
                              {[3, 4, 5].map(i => (
                                <img key={i} className="w-8 h-8 rounded-xl border-2 border-[#1a1a1a] shadow-xl" src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} />
                              ))}
                           </div>
                           <span className="text-[10px] font-black text-andina-text/60 uppercase tracking-widest">3 Estudiantes en espera</span>
                        </div>
                     </div>
                  </div>

                  <div className="relative opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100 group">
                     <div className="absolute left-[-34px] top-1 w-7 h-7 rounded-2xl bg-[#0a140f] border-2 border-white/10 z-10 flex items-center justify-center"></div>
                     <div>
                        <span className="text-[10px] font-black text-andina-text/40 uppercase tracking-widest font-mono">07:15 AM • Final</span>
                        <h4 className="text-lg font-black text-white mt-2 tracking-tight group-hover:text-andina-accent transition-colors">U.E. La Dolorosa</h4>
                        <p className="text-[11px] font-bold text-andina-text/40 mt-1 uppercase tracking-widest">Punto de llegada y entrega total.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Mini Map View: Cinematic Apple Map Style */}
         <div className="bg-[#0a0f0d] rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden min-h-[400px] md:min-h-[500px] group">
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(34,197,94,0.05)_0%, transparent_70%) pointer-events-none"></div>
            
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
               <pattern id="route-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#route-grid)" />
            </svg>
            
            {/* Animated Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
               <path d="M100,380 Q250,150 450,420 T700,200" fill="none" stroke="var(--color-andina-primary)" strokeWidth="6" strokeDasharray="12 6" className="animate-[dash_20s_linear_infinite] drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            </svg>

            {/* Markers */}
            <div className="absolute top-[73%] left-[10.6%] w-6 h-6 md:w-8 md:h-8 bg-andina-primary border-4 border-[#0a140f] rounded-2xl z-20 shadow-2xl animate-pulse"></div>
            <div className="absolute top-[37%] left-[85.6%] w-8 h-8 md:w-10 md:h-10 bg-andina-accent border-4 border-[#0a140f] rounded-2xl z-20 shadow-2xl flex items-center justify-center rotate-12">
               <Flag size={16} className="text-white md:hidden" />
               <Flag size={20} className="text-white hidden md:block" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-andina-surface/60 backdrop-blur-2xl p-4 sm:p-6 rounded-[2rem] border border-white/10 shadow-2xl z-30 transform group-hover:-translate-y-2 transition-transform duration-500">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-5">
                     <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-andina-primary/20 text-andina-primary flex items-center justify-center animate-pulse border border-andina-primary/30 shrink-0">
                        <MapPin size={20} className="sm:hidden" />
                        <MapPin size={24} className="hidden sm:block" />
                     </div>
                     <div>
                        <p className="font-black text-white text-base sm:text-lg tracking-tight">Sincronización GPS</p>
                        <p className="text-[8px] sm:text-[10px] font-black text-andina-text/40 uppercase tracking-[0.2em] mt-1 font-mono italic">Loja • Tiempo real Activo</p>
                     </div>
                  </div>
                  <button className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl text-andina-primary hover:bg-white hover:text-black hover:border-white transition-all active:scale-90 shadow-xl">
                     <ArrowRight size={20} className="sm:hidden" />
                     <ArrowRight size={24} className="hidden sm:block" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
