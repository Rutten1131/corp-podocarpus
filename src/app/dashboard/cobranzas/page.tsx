"use client";

import { PAGOS } from "@/lib/mock-data";
import { Search, Download, Filter, MoreHorizontal, CheckCircle2, AlertCircle, Clock, MessageCircle } from "lucide-react";

export default function CobranzasPage() {
  const pagados = PAGOS.filter(p => p.estado === "pagado").length;
  const pendientes = PAGOS.filter(p => p.estado === "pendiente").length;
  const vencidos = PAGOS.filter(p => p.estado === "vencido").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Control de Cobranzas</h2>
          <p className="text-surface-500 text-sm mt-1">Gestión de pagos mensuales de padres de familia</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors shadow-sm">
            <Filter size={16} />
            <span>Filtros</span>
          </button>
          <button className="flex items-center gap-2 bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors shadow-sm">
            <Download size={16} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border text-center p-4 rounded-xl border-success/30 bg-success/5">
          <p className="text-success text-sm font-semibold uppercase tracking-wider">Pagado (Abril)</p>
          <p className="text-3xl font-bold text-surface-900 mt-1">{pagados}</p>
        </div>
        <div className="bg-white border text-center p-4 rounded-xl border-warning/30 bg-warning/5">
          <p className="text-warning text-sm font-semibold uppercase tracking-wider">Pendiente (A tiempo)</p>
          <p className="text-3xl font-bold text-surface-900 mt-1">{pendientes}</p>
        </div>
        <div className="bg-white border text-center p-4 rounded-xl border-danger/30 bg-danger/5">
          <p className="text-danger text-sm font-semibold uppercase tracking-wider">Vencido</p>
          <p className="text-3xl font-bold text-surface-900 mt-1">{vencidos}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Buscar estudiante o padre..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 text-surface-700">
               <option>Mes: Abril 2026</option>
               <option>Mes: Marzo 2026</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-50 text-surface-500 font-medium border-b border-surface-200">
              <tr>
                <th className="px-6 py-3">Estudiante / Padre</th>
                <th className="px-6 py-3">Unidad</th>
                <th className="px-6 py-3">Monto</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Fecha/Método</th>
                <th className="px-6 py-3 relative">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {PAGOS.map((pago) => (
                <tr key={pago.id} className="hover:bg-surface-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-surface-900">{pago.estudiante}</span>
                      <span className="text-[13px] text-surface-500">Rep: {pago.padre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-surface-700">
                    {pago.socioId.replace("S00", "U-0")}
                  </td>
                  <td className="px-6 py-4 font-medium text-surface-900">
                    ${pago.monto.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-brand-500/30 ${
                        pago.estado === "pagado" ? "bg-success/10 text-success border-success/20" : 
                        pago.estado === "pendiente" ? "bg-warning/10 text-warning border-warning/20" :
                        "bg-danger/10 text-danger border-danger/20"
                      }`}
                      defaultValue={pago.estado}
                    >
                      <option value="pagado">Pagado</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="vencido">Vencido</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {pago.fechaPago ? (
                      <div className="flex flex-col">
                        <span className="text-surface-900">{pago.fechaPago}</span>
                        <span className="text-[12px] text-surface-500">{pago.metodo}</span>
                      </div>
                    ) : (
                      <span className="text-surface-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {pago.estado !== "pagado" ? (
                      <button className="flex items-center gap-1.5 text-xs font-bold bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 px-3 py-1.5 rounded transition-colors shadow-sm">
                        <MessageCircle size={14} />
                        Notificar WhatsApp
                      </button>
                    ) : (
                       <button className="p-1.5 text-surface-400 hover:text-surface-700 hover:bg-surface-200 rounded transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
