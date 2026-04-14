"use client";

import { AlertCircle, ArrowDownToLine, ArrowUpRight, Copy, CreditCard, DollarSign, Download, Filter, Receipt, Wallet, Shield, Wrench, Briefcase, Plus, MinusSquare, FileText, ArrowRightLeft, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { INGRESOS_MENSUALES } from "@/lib/mock-data";
import { useState } from "react";

export default function ContabilidadPage() {
  const [chartFilter, setChartFilter] = useState<'balance' | 'ingresos' | 'gastos'>('balance');
  const [activeModal, setActiveModal] = useState<'ingreso' | 'gasto' | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Contabilidad y Finanzas</h2>
          <p className="text-surface-500 text-sm mt-1">Gestión del fondo común, gastos operativos y provisiones</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 bg-white border border-surface-200 px-3 py-1.5 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors shadow-sm">
            <Filter size={14} /> Filtrar Fechas
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-surface-200 px-3 py-1.5 rounded-lg text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors shadow-sm">
            <FileText size={14} /> Balance General
          </button>
          <div className="bg-surface-200 w-px h-6 mx-1"></div>
          <button 
             onClick={() => setActiveModal('ingreso')}
             className="flex items-center gap-1.5 bg-success hover:bg-success/90 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            <Plus size={14} /> Nota Ingreso
          </button>
          <button 
             onClick={() => setActiveModal('gasto')}
             className="flex items-center gap-1.5 bg-danger hover:bg-danger/90 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            <MinusSquare size={14} /> Registrar Gasto
          </button>
        </div>
      </div>

      {/* Tarjetas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-surface-900 to-surface-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet size={80} />
           </div>
           <p className="text-surface-300 text-sm font-medium mb-1">Caja Chica (Fondo Cooperativa)</p>
           <h3 className="text-4xl font-bold mb-4 tracking-tight">$42,500.00</h3>
           <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-success">
                 <ArrowUpRight size={16} />
                 <span>+$8,200 (Mes)</span>
              </div>
              <div className="text-surface-400">Cuenta Principal Produbanco</div>
           </div>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-surface-500 text-sm font-medium">Cuentas por Cobrar (Socios)</p>
                 <h3 className="text-3xl font-bold text-surface-900 mt-1">$4,180.00</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-danger/10 text-danger flex items-center justify-center">
                 <AlertCircle size={20} />
              </div>
           </div>
           <button className="w-full text-center text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 py-2 rounded-lg transition-colors">
              Ver 12 socios en mora
           </button>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-surface-500 text-sm font-medium">Provisiones de Mantenimiento</p>
                 <h3 className="text-3xl font-bold text-surface-900 mt-1">$15,200.00</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center">
                 <Receipt size={20} />
              </div>
           </div>
           <p className="text-sm text-surface-500">Reservado histórico para mantenimientos de flota.</p>
        </div>
      </div>

      {/* Gráfica y Últimos Movimientos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-xl border border-surface-200 shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h3 className="text-lg font-semibold text-surface-900">Métricas Financieras</h3>
                  <div className="flex bg-surface-100 p-1 rounded-lg w-max mt-2">
                     <button 
                       onClick={() => setChartFilter('balance')}
                       className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${chartFilter === 'balance' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500 hover:text-surface-900'}`}
                     >Balance General</button>
                     <button 
                       onClick={() => setChartFilter('ingresos')}
                       className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${chartFilter === 'ingresos' ? 'bg-success text-white shadow-sm' : 'text-surface-500 hover:text-surface-900'}`}
                     >Ingresos</button>
                     <button 
                       onClick={() => setChartFilter('gastos')}
                       className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${chartFilter === 'gastos' ? 'bg-surface-900 text-white shadow-sm' : 'text-surface-500 hover:text-surface-900'}`}
                     >Gastos Operativos</button>
                  </div>
               </div>
               <select className="text-sm border border-surface-200 rounded-lg px-3 py-1.5 bg-surface-50 self-start sm:self-auto">
                  <option>Ene - Jun 2026</option>
               </select>
            </div>
            <div className="h-[250px] w-full flex-1">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={INGRESOS_MENSUALES} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-surface-200)" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-surface-500)" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-surface-500)" }} tickFormatter={(value) => `$${value / 1000}k`} />
                  <RechartsTooltip cursor={{fill: 'var(--color-surface-50)'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  {(chartFilter === 'balance' || chartFilter === 'ingresos') && (
                    <Bar dataKey="ingresos" name="Cobros y Aportaciones" fill="var(--color-success)" radius={[4, 4, 0, 0]} barSize={24} animationDuration={500} />
                  )}
                  {(chartFilter === 'balance' || chartFilter === 'gastos') && (
                    <Bar dataKey="gastos" name="Gastos y Egresos" fill="var(--color-surface-300)" radius={[4, 4, 0, 0]} barSize={24} animationDuration={500} />
                  )}
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-surface-200">
               <h3 className="text-lg font-bold text-surface-900 mb-2">Libro Diario (Transacciones)</h3>
               <div className="flex gap-2">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-surface-900 text-white cursor-pointer">Todas</span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-surface-100 text-surface-600 hover:bg-surface-200 cursor-pointer">Ingresos</span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-surface-100 text-surface-600 hover:bg-surface-200 cursor-pointer">Egresos</span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-surface-100 text-surface-600 hover:bg-surface-200 cursor-pointer">Impuestos (SRI)</span>
               </div>
            </div>
            <div className="flex-1 overflow-y-auto w-full">
               <div className="divide-y divide-surface-100">
                  {[
                     { id: 'T-999', type: 'in', concept: 'Cobro General Rutas (Semana 14)', date: 'Hoy, 10:30 AM', amount: 3500.00, icon: ArrowDownToLine },
                     { id: 'T-998', type: 'out', concept: 'Alquiler Terreno/Parqueadero', date: 'Hoy, 09:41 AM', amount: -650.00, icon: Wallet },
                     { id: 'T-997', type: 'tax', concept: 'Impuestos Prediales y SRI', date: 'Ayer, 14:20 PM', amount: -1200.00, icon: FileText },
                     { id: 'T-996', type: 'out', concept: 'Pago Luz Eléctrica Sede', date: '11 Abril 2026', amount: -85.50, icon: Receipt },
                     { id: 'T-995', type: 'out', concept: 'Pago Agua Potable', date: '08 Abril 2026', amount: -42.00, icon: Receipt },
                     { id: 'T-993', type: 'out', concept: 'Pago Seguros de Flota', date: '02 Abril 2026', amount: -2450.00, icon: Shield },
                  ].map((trx, i) => (
                     <div key={i} className="flex items-center justify-between p-4 hover:bg-surface-50 transition-colors">
                        <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${trx.type === 'in' ? 'bg-success/10 text-success' : trx.type === 'tax' ? 'bg-warning/10 text-warning' : 'bg-surface-100 text-surface-600'}`}>
                              <trx.icon size={16} />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-surface-900">{trx.concept}</p>
                              <div className="flex gap-2 items-center text-xs text-surface-500 font-medium">
                                 <span>{trx.date}</span>
                                 <span>•</span>
                                 <span className="uppercase text-[10px] bg-surface-200 px-1 rounded text-surface-600">{trx.id}</span>
                              </div>
                           </div>
                        </div>
                        <span className={`text-sm font-black ${trx.amount > 0 ? 'text-success' : 'text-surface-900'}`}>{trx.amount > 0 ? '+' : ''}{trx.amount > 0 ? '$' : '-$'}{Math.abs(trx.amount).toFixed(2)}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Slide-over Contable (Ingreso / Egreso) */}
      {activeModal && (
         <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-surface-900/40 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
            <div className="relative w-full max-w-sm h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
               <div className={`p-6 border-b ${activeModal === 'ingreso' ? 'bg-success/10 border-success/20' : 'bg-danger/10 border-danger/20'} flex justify-between items-center`}>
                  <div>
                     <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${activeModal === 'ingreso' ? 'text-success' : 'text-danger'}`}>
                        Comprobante Contable
                     </p>
                     <h3 className="text-xl font-bold text-surface-900">
                        {activeModal === 'ingreso' ? 'Nota de Ingreso' : 'Registro de Gasto'}
                     </h3>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-surface-600">
                     <X size={20} />
                  </button>
               </div>

               <div className="p-6 overflow-y-auto flex-1 space-y-5">
                  <div>
                     <label className="block text-xs font-bold text-surface-500 mb-1.5 uppercase">Monto ($)</label>
                     <div className="relative">
                        <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                        <input type="number" placeholder="0.00" className="w-full pl-9 pr-4 py-3 rounded-lg border border-surface-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-lg font-bold" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-surface-500 mb-1.5 uppercase">Concepto / Referencia</label>
                     <input type="text" placeholder={activeModal === 'ingreso' ? 'Ej. Aportes Socio LAA-012' : 'Ej. Pago Servicios Oficina'} className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:outline-none focus:border-brand-500 text-sm" />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-surface-500 mb-1.5 uppercase">Categoría</label>
                     <select className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:outline-none focus:border-brand-500 text-sm bg-white">
                        {activeModal === 'ingreso' ? (
                           <>
                              <option>Cobros de Ruta</option>
                              <option>Aportaciones Mensuales</option>
                              <option>Multas y Penalidades</option>
                              <option>Otros Ingresos</option>
                           </>
                        ) : (
                           <>
                              <option>Mantenimiento Vehicular</option>
                              <option>Impuestos y Trámites SRI</option>
                              <option>Pago a Empleados/Roles</option>
                              <option>Servicios Básicos Generales</option>
                           </>
                        )}
                     </select>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-surface-500 mb-1.5 uppercase">Fecha de Emisión</label>
                     <input type="date" className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:outline-none focus:border-brand-500 text-sm text-surface-600" />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-surface-500 mb-1.5 uppercase">Subir Respaldo (Factura/Recibo)</label>
                     <div className="mt-1 border-2 border-dashed border-surface-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-surface-50 cursor-pointer transition-colors">
                        <FileText size={24} className="text-surface-400 mb-2" />
                        <p className="text-xs text-surface-500 font-medium">Click para subir foto o PDF</p>
                     </div>
                  </div>
               </div>

               <div className="p-6 border-t border-surface-200 bg-surface-50">
                  <button className={`w-full py-3 rounded-lg text-white font-bold text-sm shadow-sm transition-opacity hover:opacity-90 ${activeModal === 'ingreso' ? 'bg-success' : 'bg-surface-900'}`}>
                     Guardar y Contabilizar
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}


