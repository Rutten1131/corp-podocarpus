"use client";

import { SOCIOS } from "@/lib/mock-data";
import { Search, Plus, Filter, MoreVertical, ShieldAlert, CheckCircle2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SociosPage() {
  const [selectedSocio, setSelectedSocio] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Directorio de Socios</h2>
          <p className="text-surface-500 text-sm mt-1">Gestión de conductores y padrón cooperativo</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors shadow-sm">
            <Filter size={16} />
            <span>Filtros</span>
          </button>
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors shadow-sm">
            <Plus size={16} />
            <span>Nuevo Socio</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-surface-200 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, placa o unidad..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-50 text-surface-500 font-medium">
              <tr>
                <th className="px-6 py-3">Socio</th>
                <th className="px-6 py-3">Unidad / Placa</th>
                <th className="px-6 py-3">Ruta Asignada</th>
                <th className="px-6 py-3">Pasajeros</th>
                <th className="px-6 py-3">Docs / Mantenimiento</th>
                <th className="px-6 py-3 relative">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {SOCIOS.map((socio) => (
                <tr key={socio.id} className="hover:bg-surface-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center text-surface-600 font-medium shrink-0">
                        {socio.foto}
                      </div>
                      <div>
                        <p className="font-semibold text-surface-900">{socio.nombre}</p>
                        <p className="text-[13px] text-surface-500">{socio.telefono}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-surface-900">{socio.unidad}</span>
                      <span className="text-[13px] text-surface-500">{socio.placa} • {socio.marca}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-surface-700">
                    {socio.ruta.split(" - ")[1]}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-surface-900">{socio.pasajeros} niños</span>
                      <span className="text-[13px] text-success">Pagos: {socio.pagosRecibidos}/{socio.pagosMes}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     {new Date(socio.proximoMantenimiento) < new Date("2026-04-18") ? (
                        <div className="flex items-center gap-1.5 text-warning bg-warning/10 px-2.5 py-1 rounded-full w-max text-xs font-medium">
                          <ShieldAlert size={14} />
                          Revisión pronto
                        </div>
                     ) : (
                        <div className="flex items-center gap-1.5 text-success bg-success/10 px-2.5 py-1 rounded-full w-max text-xs font-medium">
                          <CheckCircle2 size={14} />
                          Al día
                        </div>
                     )}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                       onClick={() => setSelectedSocio(socio)}
                       className="p-1.5 text-surface-400 hover:text-surface-700 hover:bg-surface-200 rounded transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-surface-200 text-xs text-surface-500 flex justify-between items-center">
          <span>Mostrando {SOCIOS.length} de {SOCIOS.length} socios</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 border border-surface-200 rounded text-surface-400 cursor-not-allowed">Anterior</button>
            <button className="px-2 py-1 bg-surface-100 border border-surface-200 rounded text-surface-700 font-medium">1</button>
            <button className="px-2 py-1 border border-surface-200 rounded text-surface-400 cursor-not-allowed">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Slide-over Modal para Info del Socio */}
      {selectedSocio && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay oscuro */}
          <div 
             className="absolute inset-0 bg-surface-900/50 backdrop-blur-sm transition-opacity" 
             onClick={() => setSelectedSocio(null)}
          ></div>
          
          {/* Panel lateral */}
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-surface-200 flex justify-between items-start bg-surface-50">
               <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-full bg-surface-200 flex items-center justify-center text-xl text-surface-600 font-bold shrink-0 shadow-sm border-2 border-white">
                    {selectedSocio.foto}
                  </div>
                  <div>
                    <h3 className="font-bold text-surface-900 text-lg leading-tight">{selectedSocio.nombre}</h3>
                    <p className="text-sm text-surface-500 font-medium">{selectedSocio.unidad} • {selectedSocio.placa}</p>
                  </div>
               </div>
               <button 
                  onClick={() => setSelectedSocio(null)}
                  className="p-2 text-surface-400 hover:bg-surface-200 rounded-full transition-colors"
               >
                  <X size={20} />
               </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
               <div>
                  <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-3">Contacto</h4>
                  <p className="text-sm text-surface-900 font-medium mb-1">Cédula: <span className="font-normal text-surface-600 ml-2">{selectedSocio.cedula}</span></p>
                  <p className="text-sm text-surface-900 font-medium mb-1">Teléfono: <span className="font-normal text-surface-600 ml-2">{selectedSocio.telefono}</span></p>
                  <p className="text-sm text-surface-900 font-medium">Email: <span className="font-normal text-surface-600 ml-2">{selectedSocio.email}</span></p>
               </div>

               <div>
                  <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-3">Vehículo Asignado</h4>
                  <div className="bg-surface-50 p-3 rounded-lg border border-surface-200">
                     <p className="text-sm text-surface-900 font-bold mb-1">{selectedSocio.marca} {selectedSocio.modelo} ({selectedSocio.anio})</p>
                     <p className="text-sm text-surface-600">Ruta: {selectedSocio.ruta.split(" - ")[1] || selectedSocio.ruta}</p>
                     <div className="mt-3 flex justify-between items-center pt-3 border-t border-surface-200">
                        <span className="text-xs text-surface-500">Mantenimiento</span>
                        {new Date(selectedSocio.proximoMantenimiento) < new Date("2026-04-18") ? (
                           <span className="text-xs font-bold text-warning flex items-center gap-1"><ShieldAlert size={14}/> Pendiente</span>
                        ) : (
                           <span className="text-xs font-bold text-success flex items-center gap-1"><CheckCircle2 size={14}/> Al día</span>
                        )}
                     </div>
                  </div>
               </div>

               <div>
                  <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-3">Finanzas Mensuales</h4>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="border border-success/30 bg-success/5 p-3 rounded-lg text-center">
                        <p className="text-[10px] uppercase font-bold text-success mb-1">Ingresos Base</p>
                        <p className="text-lg font-black text-surface-900">${selectedSocio.ingresoMensual}</p>
                     </div>
                     <div className="border border-danger/30 bg-danger/5 p-3 rounded-lg text-center">
                        <p className="text-[10px] uppercase font-bold text-danger mb-1">Costo Operativo</p>
                        <p className="text-lg font-black text-surface-900">${selectedSocio.gastoMensual}</p>
                     </div>
                  </div>
               </div>

               <div className="pt-4 flex gap-3">
                  <button className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                     Ver Bitácora Full
                  </button>
                  <button className="flex-none bg-surface-100 hover:bg-surface-200 text-surface-700 font-bold py-2.5 px-4 rounded-lg text-sm transition-colors border border-surface-300">
                     Editar
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
