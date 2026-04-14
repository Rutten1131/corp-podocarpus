"use client";

import { AlertTriangle, CheckCircle2, ChevronRight, Plus, Receipt, Settings2, Wrench } from "lucide-react";

const HISTORIAL = [
  { id: "M01", fecha: "Ayer", tipo: "Cambio de Aceite", kms: "85,400 km", costo: "$85.00", estado: "completado" },
  { id: "M02", fecha: "2 Ene 2026", tipo: "Rotación Llantas", kms: "79,100 km", costo: "$40.00", estado: "completado" },
  { id: "M03", fecha: "15 Oct 2025", tipo: "Mantenimiento Frenos", kms: "72,800 km", costo: "$140.00", estado: "completado" },
  { id: "M04", fecha: "03 Ago 2025", tipo: "Revisión Corposan", kms: "65,300 km", costo: "$25.00", estado: "completado" },
];

export default function MantenimientoPage() {
  return (
    <div className="space-y-6 max-w-5xl">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div>
           <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Depreciación y Mantenimiento</h2>
           <p className="text-surface-500 text-sm mt-1">Lleve el control del kilometraje y gastos de su buseta</p>
         </div>
         <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors shadow-sm">
             <Plus size={16} />
             <span>Registrar Gasto</span>
           </button>
         </div>
       </div>

       {/* Panel de Alertas y KM */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
             <div className="absolute -right-8 -bottom-8 opacity-10">
                <Settings2 size={150} />
             </div>
             <p className="text-surface-400 font-medium uppercase tracking-widest text-xs mb-2">Mi Vehículo</p>
             <h3 className="text-4xl font-black mb-1">Hyundai County</h3>
             <p className="text-brand-400 font-medium text-lg mb-8">LAA-0123 / Unidad 01</p>

             <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-surface-400 text-sm mb-1">Kilometraje Actual</p>
                  <p className="text-2xl font-bold">85,420 <span className="text-base font-medium text-surface-500">km</span></p>
                </div>
                <div>
                  <p className="text-surface-400 text-sm mb-1">Gastos (Este mes)</p>
                  <p className="text-2xl font-bold text-danger">$125.00</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-4">
             {/* Próximo Cambio de Aceite */}
             <div className="bg-white p-5 rounded-xl border border-warning/40 shadow-sm shadow-warning/5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center shrink-0">
                   <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-surface-900">Próximo Cambio de Aceite</h4>
                   <p className="text-sm text-surface-500 mt-1">Programado a los <b>89,000 km</b> (Faltan ~3,580 km)</p>
                   <div className="w-full bg-surface-100 rounded-full h-2.5 mt-3 overflow-hidden">
                      <div className="bg-warning h-2.5 rounded-full" style={{ width: '85%' }}></div>
                   </div>
                </div>
             </div>

             {/* Matricula / Seguros */}
             <div className="bg-white p-5 rounded-xl border border-surface-200 shadow-sm flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                   <CheckCircle2 size={24} />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-surface-900">Matrícula y Seguros</h4>
                   <p className="text-sm text-surface-500 mt-1">Al día. Próxima revisión en <b>Marzo 2027</b>.</p>
                </div>
             </div>
          </div>
       </div>

       {/* Historial de Mantenimientos */}
       <div className="bg-white border border-surface-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-surface-200 bg-surface-50 flex justify-between items-center">
             <div>
                <h3 className="font-bold text-surface-900">Historial de Gastos Mecánicos</h3>
                <p className="text-xs text-surface-500 mt-1">Registre todo aquí para deducciones del SRI.</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center text-surface-600">
                <Receipt size={20} />
             </div>
          </div>
          
          <div className="divide-y divide-surface-100">
             {HISTORIAL.map((item, i) => (
                <div key={i} className="p-4 hover:bg-surface-50 transition-colors flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.id === 'M01' ? 'bg-brand-50 text-brand-600 border border-brand-200' : 'bg-surface-100 text-surface-500'}`}>
                         <Wrench size={18} />
                      </div>
                      <div>
                         <p className="font-bold text-surface-900">{item.tipo}</p>
                         <div className="flex items-center gap-3 text-xs text-surface-500 mt-1">
                            <span className="font-medium text-surface-700">{item.kms}</span>
                            <span>•</span>
                            <span>{item.fecha}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                     <span className="font-bold text-surface-900">{item.costo}</span>
                     <button className="text-surface-400 hover:text-brand-600">
                        <ChevronRight size={20} />
                     </button>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
