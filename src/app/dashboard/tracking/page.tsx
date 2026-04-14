"use client";

import { UNIDADES_GPS } from "@/lib/mock-data";
import { Focus, Radio, Navigation, Maximize, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function TrackingPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  
  // Simulate live updates for the UI
  const [tick, setTick] = useState(0);
  useEffect(() => {
     const interval = setInterval(() => {
        setTick(t => t + 1);
     }, 2000);
     return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Centro de Monitoreo GPS</h2>
          <p className="text-surface-500 text-sm mt-1">Control satelital de la flota en tiempo real (Prototipo Visual)</p>
        </div>
        <div className="flex items-center gap-3">
           <div className={`flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-lg text-sm font-bold transition-all ${tick % 2 === 0 ? 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' : ''}`}>
             <Radio size={16} className={tick % 2 === 0 ? 'animate-pulse' : ''} />
             {UNIDADES_GPS.filter(u => u.estado === 'en-ruta').length} UNIDADES EN RUTA
           </div>
           <button className="p-2 bg-white border border-surface-200 rounded-lg text-surface-600 hover:bg-surface-50">
              <Maximize size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 rounded-xl border-2 border-surface-200 overflow-hidden relative shadow-md bg-surface-100 flex">
         
         {/* MAPA SIMULADO (Fondo estático + Puntos dinámicos usando posiciones absolutas relativas a Loja) */}
         <div className="absolute inset-0 bg-[#e5e7eb] overflow-hidden">
            {/* SVG Grid para simular mapa de calles de manera 100% confiable (sin links rotos) */}
            <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  <pattern id="street-grid" width="120" height="120" patternUnits="userSpaceOnUse">
                     {/* Cuadras principales (Manzanas) */}
                     <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#ffffff" strokeWidth="12" />
                     {/* Calles secundarias */}
                     <path d="M 60 0 L 60 120 M 0 60 L 120 60" fill="none" stroke="#f3f4f6" strokeWidth="6" />
                     <path d="M 30 0 L 30 120 M 0 30 L 120 30 M 90 0 L 90 120 M 0 90 L 120 90" fill="none" stroke="#f3f4f6" strokeWidth="2" strokeDasharray="4 4" />
                  </pattern>
                  {/* Patrón de áreas verdes / parques */}
                  <pattern id="parks" width="360" height="360" patternUnits="userSpaceOnUse">
                     <rect x="20" y="20" width="80" height="80" fill="#d1fae5" rx="8" />
                     <rect x="200" y="140" width="100" height="60" fill="#d1fae5" rx="8" />
                     <rect x="80" y="260" width="60" height="60" fill="#d1fae5" rx="8" />
                  </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#parks)" />
               <rect width="100%" height="100%" fill="url(#street-grid)" />
            </svg>
            
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-brand-500/5 pointer-events-none mix-blend-multiply"></div>

            {/* Marcadores de GPS renderizados sobre el mapa estático */}
            {/* Las coordenadas lat/lng del mock (-4.xx, -79.xx) se mapean a % para este demo visual */}
            {UNIDADES_GPS.map((unidad, index) => {
               // Pseudo-random movement para los que están en ruta
               let addedLat = 0;
               let addedLng = 0;
               if (unidad.estado === 'en-ruta') {
                  const speed = unidad.velocidad / 100; // factor de velocidad
                  addedLat = Math.sin(tick * speed + index) * 0.003;
                  addedLng = Math.cos(tick * speed + index) * 0.003;
               }

               // Mapping simple para demo de Loja: Centro en -4.00, -79.20 
               const topPos = 50 + (unidad.lat + addedLat + 4.00) * 1500;
               const leftPos = 50 + (unidad.lng + addedLng + 79.20) * 1500;
               
               const isSelected = activeUnit === unidad.id;
               
               return (
                  <div 
                     key={unidad.id}
                     onClick={() => setActiveUnit(unidad.id)}
                     className={`absolute w-12 h-12 -ml-6 -mt-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 z-20 ${isSelected ? 'z-30' : ''}`}
                     style={{ 
                        top: `${topPos}%`, 
                        left: `${leftPos}%`, 
                        transitionDuration: '2000ms', 
                        transitionTimingFunction: 'linear' 
                     }}
                  >
                     <div className={`relative flex items-center justify-center transition-all duration-300 ${isSelected ? 'w-10 h-10' : 'w-8 h-8'}`}>
                        {/* Ping animation para unidades en ruta */}
                        {unidad.estado === 'en-ruta' && (
                           <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-75"></div>
                        )}
                        <div 
                           className={`relative z-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white transition-all duration-500
                           ${unidad.estado === 'en-ruta' ? 'bg-brand-500 w-full h-full' : 
                             unidad.estado === 'detenido' ? 'bg-warning w-full h-full' : 'bg-surface-400 w-full h-full'}`}
                           style={{
                              transform: `rotate(${unidad.estado === 'en-ruta' ? (Math.sin(tick + index) * 45) : 0}deg)`,
                              transitionTimingFunction: 'linear'
                           }}
                        >
                           <Navigation size={isSelected ? 20 : 16} />
                        </div>
                     </div>
                     {/* Etiqueta de la placa */}
                     <div className={`mt-1 px-2 py-0.5 rounded text-xs font-bold shadow-sm border ${isSelected ? 'bg-surface-900 border-surface-900 text-white' : 'bg-white border-surface-200 text-surface-800'}`}>
                        {unidad.placa}
                     </div>
                  </div>
               )
            })}
         </div>
         

         {/* PANEL LATERAL DE CONTROL */}
         <div className="absolute right-4 top-4 bottom-4 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-surface-200 overflow-hidden flex flex-col z-40">
            <div className="p-4 border-b border-surface-200 bg-surface-50 flex justify-between items-center">
               <div>
                  <h4 className="font-bold text-surface-900">Flota Operativa</h4>
                  <p className="text-xs text-surface-500">{UNIDADES_GPS.length} unidades registradas</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  <Navigation size={20} />
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
               {UNIDADES_GPS.map(unidad => {
                  const isActive = activeUnit === unidad.id;
                  return (
                     <div 
                        key={unidad.id} 
                        onClick={() => setActiveUnit(unidad.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${isActive ? 'bg-brand-50 border-brand-300 shadow-sm' : 'bg-white border-surface-200 hover:border-brand-200 hover:bg-surface-50'}`}
                     >
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">
                              <span className="font-bold text-surface-900">{unidad.placa}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${unidad.estado === 'en-ruta' ? 'bg-success text-white' : unidad.estado === 'detenido' ? 'bg-warning text-white' : 'bg-surface-200 text-surface-600'}`}>
                                 {unidad.estado}
                              </span>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-3">
                           <div>
                              <p className="text-[10px] text-surface-400 font-semibold uppercase tracking-wider mb-0.5">Velocidad</p>
                              <p className={`text-xl font-bold ${unidad.velocidad > 60 ? 'text-danger' : 'text-surface-900'}`}>{unidad.velocidad} <span className="text-xs font-normal text-surface-500">km/h</span></p>
                           </div>
                           <div>
                              <p className="text-[10px] text-surface-400 font-semibold uppercase tracking-wider mb-0.5">Combustible</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                 <div className="w-16 h-2 bg-surface-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${unidad.combustible < 20 ? 'bg-danger' : 'bg-brand-500'}`} style={{ width: `${unidad.combustible}%`}}></div>
                                 </div>
                                 <span className="text-xs font-bold text-surface-700">{unidad.combustible}%</span>
                              </div>
                           </div>
                        </div>

                        {isActive && (
                           <div className="mt-4 pt-3 border-t border-brand-200 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs text-surface-600">
                                 <Clock size={14} />
                                 Última señal: {unidad.ultimaAct}
                              </div>
                              <button className="text-xs font-bold text-brand-700 hover:text-brand-800">
                                 Ver Ruta Completa &rarr;
                              </button>
                           </div>
                        )}
                     </div>
                  )
               })}
            </div>
         </div>
         
         {/* Leyenda inferior */}
         <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-surface-200 shadow-xl flex items-center gap-6 z-40">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-brand-500 ring-2 ring-brand-200"></div>
               <span className="text-xs font-medium text-surface-700">En Ruta</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-warning ring-2 ring-warning/30"></div>
               <span className="text-xs font-medium text-surface-700">Detenido</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-surface-400 ring-2 ring-surface-200"></div>
               <span className="text-xs font-medium text-surface-700">Fuera de Servicio</span>
            </div>
         </div>

      </div>
    </div>
  );
}
