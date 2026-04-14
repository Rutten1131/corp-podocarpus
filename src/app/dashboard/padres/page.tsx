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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-lg">Gesti&oacute;n de <span className="text-andina-primary">Familias</span></h2>
          <p className="text-andina-text/60 text-xs font-mono uppercase tracking-[0.2em] mt-1 font-bold">Base de datos centralizada de representantes y estudiantes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end">
            <p className="text-[10px] font-black text-andina-text/40 uppercase tracking-widest font-mono">Contratos Activos</p>
            <p className="text-2xl font-black text-andina-primary tracking-tighter">{PADRES_DB.filter(p => p.estado === 'activo').length} families</p>
          </div>
          <button className="flex items-center gap-2 bg-andina-surface border border-andina-border px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-andina-text hover:bg-white/5 transition-all shadow-xl active:scale-95">
            <Filter size={16} className="text-andina-primary" /> Agrupar
          </button>
        </div>
      </div>

      <div className="bg-andina-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-16rem)]">
        {/* Barra de Búsqueda Zen */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5">
          <div className="relative flex-1 max-w-md group">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-andina-primary group-focus-within:scale-110 transition-transform" />
             <input
               type="text"
               placeholder="Buscar por representante, niño o parada..."
               className="w-full pl-12 pr-6 py-4 rounded-2xl bg-black/40 border border-white/10 text-sm font-bold text-white focus:outline-none focus:border-andina-primary/50 transition-all placeholder:text-white/10"
             />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-andina-text/40 font-mono">
            Directorio Actualizado <span className="w-2 h-2 rounded-full bg-andina-primary animate-pulse ml-2" />
          </div>
        </div>

        {/* Desktop View: Editorial Table */}
        <div className="hidden lg:block overflow-x-auto flex-1">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0a0f0d] border-b border-white/5 sticky top-0 z-20">
               <tr>
                  <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Perfil Familiar</th>
                  <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Comunicaci&oacute;n</th>
                  <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Punto de Abordaje</th>
                  <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Log&iacute;stica de Horarios</th>
                  <th className="px-8 py-5 text-[9px] font-black text-andina-text/40 uppercase tracking-[0.2em]">Estado</th>
                  <th className="px-8 py-5"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {PADRES_DB.map((padre, i) => (
                  <tr key={i} className={`group transition-all ${padre.estado === 'inactivo' ? 'opacity-30 grayscale' : 'hover:bg-white/5'}`}>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-2xl bg-andina-primary/10 text-andina-primary border border-andina-primary/20 flex items-center justify-center font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
                              {padre.padre.split(" ").map(n => n[0]).join("")}
                           </div>
                           <div>
                              <p className="font-black text-white text-base tracking-tight">{padre.padre}</p>
                              <p className="text-[10px] font-bold text-andina-text/40 uppercase tracking-widest mt-1 italic">Estudiante: {padre.estudiante}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                           <a href={`tel:${padre.tlf}`} className="inline-flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-andina-primary transition-colors uppercase tracking-widest">
                              <Phone size={14} className="text-andina-primary" /> {padre.tlf}
                           </a>
                           <a href={`mailto:${padre.email}`} className="inline-flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-andina-accent transition-colors uppercase tracking-widest">
                              <Mail size={14} className="text-white/20" /> {padre.email}
                           </a>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2 font-black text-white text-xs uppercase tracking-widest">
                          <MapPin size={14} className="text-andina-primary" />
                          {padre.parada}
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex flex-col gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] font-mono">
                           <p className="text-white"><span className="text-andina-text/40">PICK:</span> {padre.recogida}</p>
                           <p className="text-white"><span className="text-andina-text/40">DROP:</span> {padre.entrega}</p>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest shadow-lg ${
                            padre.estado === "activo" ? "bg-andina-primary/10 text-andina-primary border-andina-primary/20" : "bg-white/5 text-andina-text/40 border-white/10"
                          }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${padre.estado === "activo" ? 'bg-andina-primary animate-pulse' : 'bg-white/20'}`}></div>
                          {padre.estado}
                        </div>
                     </td>
                     <td className="px-8 py-6 text-right">
                        <button className="p-2.5 text-andina-text/20 hover:text-white hover:bg-white/5 rounded-xl transition-all active:scale-90">
                           <MoreVertical size={20} />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: High-End Profile Cards */}
        <div className="lg:hidden p-6 space-y-6 overflow-y-auto">
           {PADRES_DB.map((padre, i) => (
             <div key={i} className={`bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden transition-all active:scale-[0.98] ${padre.estado === 'inactivo' ? 'opacity-30 grayscale' : ''}`}>
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-andina-primary/10 text-andina-primary border border-andina-primary/20 flex items-center justify-center font-black text-sm shadow-xl">
                        {padre.padre.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-white tracking-tight leading-none">{padre.padre}</h4>
                        <p className="text-[10px] font-black text-andina-text/40 uppercase tracking-widest mt-2">{padre.estudiante}</p>
                      </div>
                   </div>
                   <div className={`px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${
                      padre.estado === "activo" ? "bg-andina-primary/10 text-andina-primary border-andina-primary/20" : "bg-white/5 text-andina-text/40 border-white/10"
                   }`}>
                      {padre.estado}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1.5 font-mono">Recogida</p>
                      <p className="font-black text-white text-sm">{padre.recogida}</p>
                   </div>
                   <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-andina-text/40 font-black uppercase tracking-widest mb-1.5 font-mono">Entrega</p>
                      <p className="font-black text-white text-sm">{padre.entrega}</p>
                   </div>
                </div>

                <div className="pt-2 flex gap-4">
                   <a href={`tel:${padre.tlf}`} className="flex-1 bg-andina-primary/10 border border-andina-primary/20 text-andina-primary py-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-andina-primary/10">
                      <Phone size={14} /> Llamar
                   </a>
                   <a href={`mailto:${padre.email}`} className="flex-1 bg-white/5 border border-white/10 text-white/40 py-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
                      <Mail size={14} /> Email
                   </a>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
