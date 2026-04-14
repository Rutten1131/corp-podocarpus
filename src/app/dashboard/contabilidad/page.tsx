"use client";

import { AlertCircle, ArrowDownToLine, ArrowUpRight, Copy, CreditCard, DollarSign, Download, Filter, Receipt, Wallet, Shield, Wrench, Briefcase, Plus, MinusSquare, FileText, ArrowRightLeft, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { INGRESOS_MENSUALES } from "@/lib/mock-data";
import { useState } from "react";

export default function ContabilidadPage() {
  const [chartFilter, setChartFilter] = useState<'balance' | 'ingresos' | 'gastos'>('balance');
  const [activeModal, setActiveModal] = useState<'ingreso' | 'gasto' | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-lg">Gestión <span className="text-andina-primary">Contable</span></h2>
          <p className="text-andina-text/80 text-xs font-mono uppercase tracking-[0.2em] mt-1 font-bold">Fondo común, gastos operativos y provisiones</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-andina-surface border border-andina-border px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-andina-text hover:bg-white/5 transition-all shadow-xl">
            <Filter size={14} className="text-andina-primary" /> Filtrar
          </button>
          <button className="flex items-center gap-2 bg-andina-surface border border-andina-border px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-andina-text hover:bg-white/5 transition-all shadow-xl">
            <FileText size={14} className="text-andina-primary" /> Balances
          </button>
          <div className="hidden sm:block w-px h-8 bg-white/5 mx-2"></div>
          <button 
             onClick={() => setActiveModal('ingreso')}
             className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-andina-primary hover:bg-andina-primary/90 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-andina-primary/20"
          >
            <Plus size={14} /> Ingreso
          </button>
          <button 
             onClick={() => setActiveModal('gasto')}
             className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-andina-accent hover:bg-andina-accent/90 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-andina-accent/20"
          >
            <MinusSquare size={14} /> Gasto
          </button>
        </div>
      </div>

      {/* Tarjetas Principales: Estilo Apple Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-andina-surface to-andina-surface/60 rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Wallet size={120} />
           </div>
           <div className="relative z-10">
              <p className="text-andina-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">Fondo Cooperativa</p>
              <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter drop-shadow-md">$42,500.00</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                 <div className="flex items-center gap-2 text-andina-primary bg-andina-primary/10 px-3 py-1.5 rounded-lg border border-andina-primary/20">
                    <ArrowUpRight size={14} />
                    <span>+$8,200 Mes</span>
                 </div>
                 <div className="text-andina-text/40">Produbanco 1022..</div>
              </div>
           </div>
        </div>

        <div className="bg-andina-surface/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl group">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <p className="text-andina-text/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1 font-mono">Cuentas por Cobrar</p>
                 <h3 className="text-4xl font-black text-white mt-1 tracking-tighter">$4,180.00</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF4D4D]/10 text-[#FF4D4D] flex items-center justify-center border border-[#FF4D4D]/20 shadow-xl group-hover:rotate-6 transition-transform">
                 <AlertCircle size={24} />
              </div>
           </div>
           <button className="w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4D4D] bg-[#FF4D4D]/10 hover:bg-[#FF4D4D]/20 py-3 rounded-xl transition-all border border-[#FF4D4D]/20">
              Gestionar 12 Morosos
           </button>
        </div>

        <div className="bg-andina-surface/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <p className="text-andina-text/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1 font-mono">Provisiones Flota</p>
                 <h3 className="text-4xl font-black text-white mt-1 tracking-tighter">$15,200.00</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-andina-primary/10 text-andina-primary flex items-center justify-center border border-andina-primary/20 shadow-xl">
                 <Receipt size={24} />
              </div>
           </div>
           <p className="text-[11px] font-bold text-andina-text/40 uppercase tracking-widest">Reservado histórico mantenimientos.</p>
        </div>
      </div>

      {/* Gráfica y Últimos Movimientos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-andina-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl p-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h3 className="text-2xl font-heading font-black text-white tracking-tighter">Métricas Financieras</h3>
                  <div className="flex bg-white/5 p-1 rounded-xl w-max mt-4 border border-white/5">
                     <button 
                       onClick={() => setChartFilter('balance')}
                       className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${chartFilter === 'balance' ? 'bg-andina-primary text-white shadow-lg' : 'text-andina-text/40 hover:text-white'}`}
                     >Balance</button>
                     <button 
                       onClick={() => setChartFilter('ingresos')}
                       className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${chartFilter === 'ingresos' ? 'bg-andina-primary text-white shadow-lg' : 'text-andina-text/40 hover:text-white'}`}
                     >Ingresos</button>
                     <button 
                       onClick={() => setChartFilter('gastos')}
                       className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${chartFilter === 'gastos' ? 'bg-andina-accent text-white shadow-lg' : 'text-andina-text/40 hover:text-white'}`}
                     >Gastos</button>
                  </div>
               </div>
               <select className="text-[10px] font-black uppercase tracking-widest border border-white/10 rounded-xl px-4 py-2 bg-andina-surface text-white">
                  <option>Enero - Junio 2026</option>
               </select>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={INGRESOS_MENSUALES} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.7)", fontWeight: 'bold', fontFamily: 'var(--font-mono)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.7)", fontWeight: 'bold', fontFamily: 'var(--font-mono)' }} tickFormatter={(value) => `$${value / 1000}k`} />
                  <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: 'rgba(10, 20, 15, 0.95)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)' }} itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }} />
                  {(chartFilter === 'balance' || chartFilter === 'ingresos') && (
                    <Bar dataKey="ingresos" name="Ingresos" fill="var(--color-andina-primary)" radius={[6, 6, 0, 0]} barSize={20} />
                  )}
                  {(chartFilter === 'balance' || chartFilter === 'gastos') && (
                    <Bar dataKey="gastos" name="Gastos" fill="var(--color-andina-accent)" radius={[6, 6, 0, 0]} barSize={20} />
                  )}
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-andina-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-8 border-b border-white/5">
               <h3 className="text-xl font-heading font-black text-white tracking-tighter">Libro Diario</h3>
               <div className="flex flex-wrap gap-2 mt-4">
                  {['Todas', 'Ingresos', 'Egresos'].map((tab, i) => (
                    <button key={i} className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg border transition-all ${i === 0 ? 'bg-andina-primary border-andina-primary text-white shadow-lg shadow-andina-primary/20' : 'bg-white/5 border-white/10 text-andina-text/40 hover:text-white'}`}>
                      {tab}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
               <div className="divide-y divide-white/5">
                  {[
                     { id: 'T-999', type: 'in', concept: 'Cobro General Rutas (S14)', date: 'Hoy, 10:30 AM', amount: 3500.00, icon: ArrowDownToLine },
                     { id: 'T-998', type: 'out', concept: 'Alquiler Sede Cooperativa', date: 'Hoy, 09:41 AM', amount: -650.00, icon: Wallet },
                     { id: 'T-997', type: 'tax', concept: 'Liquidación Impuestos SRI', date: 'Ayer, 14:20 PM', amount: -1200.00, icon: FileText },
                     { id: 'T-996', type: 'out', concept: 'Pago Luz Eléctrica Sede', date: '11 Abr', amount: -85.50, icon: Receipt },
                     { id: 'T-993', type: 'out', concept: 'Seguros Flota Completa', date: '02 Abr', amount: -2450.00, icon: Shield },
                  ].map((trx, i) => (
                     <div key={i} className="flex items-center justify-between p-6 hover:bg-white/5 transition-all group">
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${trx.type === 'in' ? 'bg-andina-primary/10 text-andina-primary border border-andina-primary/20' : trx.type === 'tax' ? 'bg-andina-accent/10 text-andina-accent border border-andina-accent/20' : 'bg-white/5 text-andina-text border border-white/10'}`}>
                              <trx.icon size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-black text-white leading-tight">{trx.concept}</p>
                              <div className="flex gap-3 items-center text-[10px] text-andina-text/40 font-bold uppercase tracking-widest mt-1.5">
                                 <span>{trx.date}</span>
                                 <span className="text-andina-primary/60 font-mono">{trx.id}</span>
                              </div>
                           </div>
                        </div>
                        <span className={`text-base font-black ${trx.amount > 0 ? 'text-andina-primary' : 'text-white'} drop-shadow-sm`}>{trx.amount > 0 ? '+' : ''}{trx.amount > 0 ? '$' : '-$'}{Math.abs(trx.amount).toFixed(2)}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Slide-over Contable: Ultra Premium Glass */}
      {activeModal && (
         <div className="fixed inset-0 z-50 flex justify-end p-0 md:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveModal(null)}></div>
            <div className="relative w-full max-w-md h-full bg-andina-surface/80 backdrop-blur-3xl border-l md:border border-white/10 md:rounded-[2.5rem] shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col overflow-hidden">
               <div className={`p-8 border-b ${activeModal === 'ingreso' ? 'bg-andina-primary/10 border-andina-primary/20' : 'bg-andina-accent/10 border-andina-accent/20'} flex justify-between items-center`}>
                  <div>
                     <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${activeModal === 'ingreso' ? 'text-andina-primary' : 'text-andina-accent'}`}>
                        Módulo Financiero
                     </p>
                     <h3 className="text-2xl font-heading font-black text-white tracking-tighter">
                        {activeModal === 'ingreso' ? 'Nota de Ingreso' : 'Registro de Gasto'}
                     </h3>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white active:scale-95">
                     <X size={24} />
                  </button>
               </div>

               <div className="p-8 overflow-y-auto flex-1 space-y-8">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                     <label className="block text-[10px] font-black text-andina-primary mb-3 uppercase tracking-widest">Monto Operación ($)</label>
                     <div className="relative">
                        <DollarSign size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-andina-primary" />
                        <input type="number" placeholder="0.00" className="w-full pl-12 pr-6 py-5 bg-andina-bg/20 rounded-2xl border border-white/10 focus:outline-none focus:border-andina-primary focus:ring-2 focus:ring-andina-primary/20 text-3xl font-black text-white tracking-tighter placeholder:text-white/10" />
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                       <label className="block text-[10px] font-black text-andina-text/40 mb-2 uppercase tracking-widest indent-1">Concepto / Referencia</label>
                       <input type="text" placeholder={activeModal === 'ingreso' ? 'Ej. Aportes Socio LAA-012' : 'Ej. Pago Servicios Oficina'} className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus:outline-none focus:border-andina-primary text-sm text-white font-bold" />
                    </div>

                    <div>
                       <label className="block text-[10px] font-black text-andina-text/40 mb-2 uppercase tracking-widest indent-1">Categorización</label>
                       <select className="w-full px-6 py-4 bg-andina-surface border border-white/10 rounded-2xl focus:outline-none focus:border-andina-primary text-sm text-white font-bold">
                          {activeModal === 'ingreso' ? (
                             <>
                                <option>Cobros de Ruta</option>
                                <option>Aportaciones Mensuales</option>
                                <option>Multas y Penalidades</option>
                             </>
                          ) : (
                             <>
                                <option>Mantenimiento Vehicular</option>
                                <option>Impuestos SRI</option>
                                <option>Pago a Empleados</option>
                             </>
                          )}
                       </select>
                    </div>

                    <div>
                       <label className="block text-[10px] font-black text-andina-text/40 mb-2 uppercase tracking-widest indent-1">Subir Comprobante (PDF/IMG)</label>
                       <div className="mt-1 border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 cursor-pointer transition-all active:scale-[0.98]">
                          <FileText size={40} className="text-andina-primary/40 mb-3" />
                          <p className="text-[10px] text-andina-text/60 font-black uppercase tracking-widest">Click para adjuntar respaldo</p>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="p-8 border-t border-white/10 bg-andina-primary/5">
                  <button className={`w-full py-5 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 ${activeModal === 'ingreso' ? 'bg-andina-primary shadow-andina-primary/20' : 'bg-andina-accent shadow-andina-accent/20'}`}>
                     Sincronizar y Guardar
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}


