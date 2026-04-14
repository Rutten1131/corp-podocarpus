"use client";

import { Search, Filter, Phone, Mail, MoreVertical, Calendar, MapPin } from "lucide-react";

// Datos falsos estructurados para la demostración
const PADRES_DB = [
  { id: "P01", padre: "Roberto Maldonado", estudiante: "Sofía Maldonado", tlf: "0991234567", email: "rmaldonado@gmail.com", ruta: "Ruta 1", parada: "La Argelia", recogida: "06:30 AM", entrega: "13:15 PM", estado: "activo" },
  { id: "P02", padre: "Carmen Espinosa", estudiante: "Diego Espinosa", tlf: "0992345678", email: "cespinosa@hotmail.com", ruta: "Ruta 1", parada: "La Argelia", recogida: "06:30 AM", entrega: "13:15 PM", estado: "activo" },
  { id: "P03", padre: "Miguel Jaramillo", estudiante: "Valentina Jaramillo", tlf: "0983456789", email: "migueljara@gmail.com", ruta: "Ruta 1", parada: "Redondel del Soldado", recogida: "06:38 AM", entrega: "13:25 PM", estado: "activo" },
  { id: "P04", padre: "Lucía Montaño", estudiante: "Andrés Montaño", tlf: "0994567890", email: "luciam@empresa.com", ruta: "Ruta 1", parada: "Supermaxi SUR", recogida: "06:45 AM", entrega: "13:30 PM", estado: "inactivo" },
  { id: "P05", padre: "Pedro Sánchez", estudiante: "Isabella Sánchez", tlf: "0985678901", email: "pedros@corp.com", ruta: "Ruta 1", parada: "Parque Simón Bolívar", recogida: "07:02 AM", entrega: "13:45 PM", estado: "activo" },
  { id: "P06", padre: "Victoria Carrión", estudiante: "Mateo Carrión", tlf: "0996789012", email: "vcarrion@gmail.com", ruta: "Ruta 1", parada: "Parque Simón Bolívar", recogida: "07:02 AM", entrega: "13:45 PM", estado: "activo" },
  { id: "P07", padre: "Eduardo Burneo", estudiante: "Camila Burneo", tlf: "0997890123", email: "eburneo@loja.net", ruta: "Ruta 1", parada: "Hospital Isidro Ayora", recogida: "07:08 AM", entrega: "13:55 PM", estado: "activo" },
];

export default function PortalPadresPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Directorio de Representantes</h2>
          <p className="text-surface-500 text-sm mt-1">Base de datos de padres de familia de su ruta vigente</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors shadow-sm">
            <Filter size={16} />
            <span>Agrupar por Parada</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-14rem)]">
        {/* Barra de Búsqueda de la BD */}
        <div className="p-4 border-b border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-50">
          <div className="relative flex-1 max-w-md">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
             <input
               type="text"
               placeholder="Buscar nombre del padre, niño o parada..."
               className="w-full pl-9 pr-4 py-2 rounded-lg border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
             />
          </div>
          <div className="flex gap-2 text-sm text-surface-500 font-medium">
             Total Contratos Activos: <span className="text-surface-900 font-bold ml-1">{PADRES_DB.filter(p => p.estado === 'activo').length}</span>
          </div>
        </div>

        {/* Tabla / Base de Datos */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white sticky top-0 shadow-[0_1px_0_0_var(--color-surface-200)] z-10 text-surface-500 font-medium uppercase tracking-wider text-xs">
               <tr>
                  <th className="px-6 py-4">Representante / Niños</th>
                  <th className="px-6 py-4">Contacto</th>
                  <th className="px-6 py-4">
                     <span className="flex items-center gap-2 cursor-pointer hover:text-surface-900 transition-colors">
                        Parada Asignada <MapPin size={14}/>
                     </span>
                  </th>
                  <th className="px-6 py-4">
                     <span className="flex items-center gap-2 cursor-pointer hover:text-surface-900 transition-colors">
                        Horarios <Calendar size={14}/>
                     </span>
                  </th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
               {PADRES_DB.map((padre, i) => (
                  <tr key={i} className={`transition-colors ${padre.estado === 'inactivo' ? 'bg-surface-50/50 opacity-60' : 'hover:bg-surface-50'}`}>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-400/20 to-brand-500/20 text-brand-700 flex items-center justify-center font-bold text-xs ring-1 ring-brand-300">
                              {padre.padre.split(" ").map(n => n[0]).join("")}
                           </div>
                           <div>
                              <p className="font-bold text-surface-900">{padre.padre}</p>
                              <p className="text-xs text-surface-500">Estudiante: {padre.estudiante}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                           <a href={`tel:${padre.tlf}`} className="flex items-center gap-1.5 text-xs text-surface-600 hover:text-brand-600 font-medium">
                              <Phone size={12} /> {padre.tlf}
                           </a>
                           <a href={`mailto:${padre.email}`} className="flex items-center gap-1.5 text-xs text-surface-600 hover:text-info">
                              <Mail size={12} /> {padre.email}
                           </a>
                        </div>
                     </td>
                     <td className="px-6 py-4 font-medium text-surface-700">
                        {padre.parada}
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                           <p className="text-surface-900"><span className="text-surface-400 font-medium mr-1 uppercase">Sube:</span> {padre.recogida}</p>
                           <p className="text-surface-900"><span className="text-surface-400 font-medium mr-1 uppercase">Baja:</span> {padre.entrega}</p>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        {padre.estado === "activo" ? (
                           <span className="px-2 py-1 bg-success/10 text-success text-[10px] font-bold uppercase rounded-md tracking-wider">Activo</span>
                        ) : (
                           <span className="px-2 py-1 bg-surface-200 text-surface-500 text-[10px] font-bold uppercase rounded-md tracking-wider">Inactivo</span>
                        )}
                     </td>
                     <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-surface-400 hover:text-surface-700 hover:bg-surface-200 rounded transition-colors">
                           <MoreVertical size={16} />
                        </button>
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
