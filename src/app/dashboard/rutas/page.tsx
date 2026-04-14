"use client";

import { RUTAS } from "@/lib/mock-data";
import { Flag, MapPin, Navigation, Clock, Users, ArrowRight } from "lucide-react";

export default function RutasPage() {
  // Para el demo, mostramos la Ruta 1 (Asignada hipotéticamente al usuario activo)
  const miRuta = RUTAS[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Mi Ruta Asignada</h2>
          <p className="text-surface-500 text-sm mt-1">Hoja de ruta diaria y listado de paradas (Busetero)</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors shadow-sm">
            <Navigation size={16} />
            <span>Iniciar Recorrido</span>
          </button>
        </div>
      </div>

      {/* Info General de la Ruta */}
      <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 shrink-0">
               <Route size={24} />
            </div>
            <div>
               <h3 className="text-xl font-bold text-surface-900">{miRuta.nombre}</h3>
               <p className="text-surface-500 font-medium">{miRuta.colegio}</p>
            </div>
         </div>
         
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto">
            <div>
               <p className="text-xs text-surface-400 font-semibold uppercase tracking-wider mb-1">Salida</p>
               <p className="font-bold text-surface-900 text-lg flex items-center gap-2"><Clock size={16} className="text-brand-500"/>{miRuta.horaSalida}</p>
            </div>
            <div>
               <p className="text-xs text-surface-400 font-semibold uppercase tracking-wider mb-1">Llegada</p>
               <p className="font-bold text-surface-900 text-lg flex items-center gap-2"><Flag size={16} className="text-success"/>{miRuta.horaLlegada}</p>
            </div>
            <div>
               <p className="text-xs text-surface-400 font-semibold uppercase tracking-wider mb-1">Pasajeros</p>
               <p className="font-bold text-surface-900 text-lg flex items-center gap-2"><Users size={16} className="text-info"/>28 Niños</p>
            </div>
            <div>
               <p className="text-xs text-surface-400 font-semibold uppercase tracking-wider mb-1">Paradas</p>
               <p className="font-bold text-surface-900 text-lg flex items-center gap-2"><MapPin size={16} className="text-warning"/>{miRuta.paradas}</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Lista de Paradas */}
         <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-surface-200 bg-surface-50">
               <h3 className="font-semibold text-surface-900">Itinerario y Paradas</h3>
            </div>
            <div className="p-4 flex-1">
               <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-300 before:via-surface-200 before:to-transparent">
                  <div className="relative">
                     <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full bg-surface-900 ring-4 ring-white z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     </div>
                     <div>
                        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded uppercase">06:30 AM</span>
                        <h4 className="text-sm font-bold text-surface-900 mt-1">Inicio de Ruta (La Argelia)</h4>
                        <p className="text-xs text-surface-500">Parador principal de la UNL.</p>
                     </div>
                  </div>
                  
                  <div className="relative">
                     <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-500 z-10"></div>
                     <div>
                        <span className="text-xs font-bold text-surface-500 uppercase">06:38 AM</span>
                        <h4 className="text-sm font-bold text-surface-900 mt-1">Redondel del Soldado</h4>
                        <div className="mt-2 bg-surface-50 rounded-lg p-3 border border-surface-100 flex justify-between items-center">
                           <div className="flex -space-x-2">
                              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=Mateo+V&background=random" />
                              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=Sofia+P&background=random" />
                           </div>
                           <span className="text-xs font-medium text-surface-600">Suben 2 estudiantes</span>
                        </div>
                     </div>
                  </div>

                  <div className="relative">
                     <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-500 z-10"></div>
                     <div>
                        <span className="text-xs font-bold text-surface-500 uppercase">06:45 AM</span>
                        <h4 className="text-sm font-bold text-surface-900 mt-1">Supermaxi SUR</h4>
                        <div className="mt-2 bg-surface-50 rounded-lg p-3 border border-surface-100 flex justify-between items-center">
                           <div className="flex -space-x-2">
                              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=Carlos+R&background=random" />
                              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=Ana+M&background=random" />
                              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=Luis+D&background=random" />
                           </div>
                           <span className="text-xs font-medium text-surface-600">Suben 3 estudiantes</span>
                        </div>
                     </div>
                  </div>

                  <div className="relative">
                     <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full bg-white border-2 border-surface-300 z-10"></div>
                     <div className="opacity-50">
                        <span className="text-xs font-bold text-surface-500 uppercase">07:02 AM</span>
                        <h4 className="text-sm font-bold text-surface-900 mt-1">Parque Simón Bolívar</h4>
                        <p className="text-xs text-surface-500">Suben 4 estudiantes</p>
                     </div>
                  </div>

                  <div className="relative">
                     <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full bg-success ring-4 ring-white z-10 flex items-center justify-center">
                        <Flag size={10} className="text-white"/>
                     </div>
                     <div className="opacity-50">
                        <span className="text-xs font-bold text-success uppercase">07:15 AM</span>
                        <h4 className="text-sm font-bold text-surface-900 mt-1">Destino: U.E. La Dolorosa</h4>
                        <p className="text-xs text-surface-500">Llegada y desembarque total.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Mapa Miniatura (Visual UI) */}
         <div className="bg-surface-100 rounded-xl border border-surface-200 shadow-sm relative overflow-hidden min-h-[400px]">
            <div className="absolute inset-0 opacity-60 bg-[url('https://maps.wikimedia.org/osm-intl/14/4514/8468.png')] bg-cover bg-center pointer-events-none"></div>
            
            {/* SVG Overlay simulando trazado de ruta */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-10" preserveAspectRatio="none">
               <path d="M50,150 Q100,50 300,200 T450,100" fill="none" stroke="var(--color-brand-600)" strokeWidth="4" strokeDasharray="8 4" className="animate-[dash_10s_linear_infinite]" />
            </svg>

            <div className="absolute top-[140px] left-[40px] w-4 h-4 bg-surface-900 border-2 border-white rounded-full z-20 shadow-md"></div>
            <div className="absolute top-[90px] left-[440px] w-6 h-6 bg-success border-2 border-white rounded-full z-20 shadow-md flex items-center justify-center">
               <Flag size={12} className="text-white" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl border border-surface-200 shadow-lg z-30">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center animate-pulse">
                        <MapPin size={20} />
                     </div>
                     <div>
                        <p className="font-bold text-surface-900 text-sm">Navegación Lista</p>
                        <p className="text-xs text-surface-500">Conectado a GPS de la unidad</p>
                     </div>
                  </div>
                  <button className="text-brand-600 p-2 hover:bg-brand-50 rounded-lg transition-colors">
                     <ArrowRight size={20} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

// Locale import fallback
import { Route } from "lucide-react";
