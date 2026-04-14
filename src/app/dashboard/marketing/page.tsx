"use client";

import { motion } from "framer-motion";
import { Megaphone, PenTool, Share2, Calendar, Sparkles, Send, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("contenido");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-white tracking-tighter uppercase">
            Marketing Estratégico
          </h1>
          <p className="text-andina-text/50 font-mono text-xs uppercase tracking-widest mt-1">
            Generador de Autoridad Andina
          </p>
        </div>
        <div className="flex gap-2 p-1 bg-andina-surface border border-andina-border rounded-xl">
          {[
            { id: "contenido", label: "Contenido", icon: PenTool },
            { id: "social", label: "Redes Sociales", icon: Share2 },
            { id: "calendario", label: "Calendario", icon: Calendar }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id 
                  ? "bg-andina-primary text-white shadow-lg shadow-andina-primary/20" 
                  : "text-andina-text/40 hover:text-andina-text hover:bg-white/5"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor / Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "calendario" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-andina-surface border border-andina-border rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-andina-border flex items-center justify-between bg-andina-bg/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-andina-accent/10 flex items-center justify-center text-andina-accent">
                    <Calendar size={18} />
                  </div>
                  <h3 className="font-bold text-white">Calendario Editorial de Autoridad</h3>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-andina-text/40">
                   <span>Abril 2026</span>
                   <div className="flex gap-1">
                      <button className="p-1 hover:text-white transition-colors">{"<"}</button>
                      <button className="p-1 hover:text-white transition-colors">{">"}</button>
                   </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-7 gap-px bg-andina-border border border-andina-border rounded-xl md:overflow-hidden">
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
                    <div key={day} className="bg-andina-bg p-3 text-center text-[10px] font-mono text-andina-text/40 uppercase tracking-widest">{day}</div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const dayNum = i - 2;
                    const isToday = dayNum === 14;
                    const hasEvent = [14, 16, 20, 25].includes(dayNum);
                    return (
                      <div key={i} className={`bg-andina-surface min-h-[80px] md:min-h-[120px] p-2 relative group hover:bg-white/[0.02] transition-colors ${dayNum <= 0 || dayNum > 30 ? 'opacity-20' : ''}`}>
                         {dayNum > 0 && dayNum <= 30 && (
                           <>
                             <span className={`text-xs font-mono ${isToday ? 'text-andina-primary font-bold' : 'text-andina-text/40'}`}>
                               {dayNum}
                               {isToday && <span className="ml-1 text-[8px] uppercase tracking-tighter">Hoy</span>}
                             </span>
                             {hasEvent && (
                               <div className="mt-2 space-y-1">
                                  <div className={`text-[8px] p-1 rounded ${dayNum === 14 ? 'bg-andina-primary/20 text-andina-primary border border-andina-primary/30' : 'bg-andina-accent/20 text-andina-accent border border-andina-accent/30'} font-bold leading-tight line-clamp-2`}>
                                     {dayNum === 14 ? "Lanzamiento Promo Escolar" : "Post: Seguridad Infantil"}
                                  </div>
                                  {dayNum === 25 && (
                                    <div className="text-[8px] p-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold leading-tight">Video: Testimonio Socio</div>
                                  )}
                               </div>
                             )}
                           </>
                         )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex flex-wrap gap-6 items-center justify-center border-t border-andina-border pt-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-andina-primary" />
                      <span className="text-[10px] font-mono text-andina-text/40 uppercase">Campaña Institucional</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-andina-accent" />
                      <span className="text-[10px] font-mono text-andina-text/40 uppercase">Contenido Técnico</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-mono text-andina-text/40 uppercase">Social Proof / Videos</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "contenido" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-andina-surface border border-andina-border rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-andina-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-andina-primary/10 flex items-center justify-center text-andina-primary">
                    <PenTool size={18} />
                  </div>
                  <h3 className="font-bold text-white">Generador de Artículos IA</h3>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-andina-primary hover:text-andina-primary/80 transition-colors">
                  <Sparkles size={12} />
                  Sugerir Temas
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Título del Artículo</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Seguridad en transporte escolar: El compromiso de Podocarpus"
                    className="w-full bg-andina-bg border border-andina-border rounded-xl px-4 py-3 text-white placeholder:text-andina-text/20 focus:outline-none focus:ring-1 focus:ring-andina-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Cuerpo del Contenido</label>
                  <textarea 
                    rows={12}
                    placeholder="Escribe o deja que la IA redacte un borrador técnico..."
                    className="w-full bg-andina-bg border border-andina-border rounded-xl px-4 py-3 text-white placeholder:text-andina-text/20 focus:outline-none focus:ring-1 focus:ring-andina-primary/50 resize-none font-sans"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button className="px-6 py-2 rounded-xl text-andina-text/40 hover:text-white transition-colors text-xs font-bold">Guardar Borrador</button>
                  <button className="bg-andina-primary px-8 py-2 rounded-xl text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(46,168,79,0.3)] transition-all flex items-center gap-2">
                    Publicar en Web
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "social" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[1, 2].map((i) => (
                <div key={i} className="bg-andina-surface border border-andina-border rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-andina-text/40 font-mono">POST PROGRAMADO</span>
                    <button className="text-andina-text/40 hover:text-white"><Share2 size={16} /></button>
                  </div>
                  <div className="aspect-video bg-andina-bg rounded-xl border border-andina-border flex items-center justify-center">
                     <span className="text-[10px] text-andina-text/20 font-mono">PREVISUALIZACIÓN DE IMAGEN</span>
                  </div>
                  <p className="text-sm text-andina-text/60 line-clamp-2 italic">"Comprometidos con el transporte seguro en Loja. #AutoridadAndina #Podocarpus"</p>
                  <div className="pt-4 border-t border-andina-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       <span className="text-[10px] font-mono text-andina-text/40">Facebook / Instagram</span>
                    </div>
                    <button className="text-andina-primary text-xs font-bold">Editar</button>
                  </div>
                </div>
              ))}
              <button className="aspect-video md:aspect-auto border-2 border-dashed border-andina-border rounded-2xl flex flex-col items-center justify-center gap-2 text-andina-text/20 hover:text-andina-primary hover:border-andina-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-andina-primary/10">
                  <Send size={20} />
                </div>
                <span className="text-xs font-bold">Crear Nuevo Post</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-andina-surface border border-andina-border rounded-2xl p-6">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-andina-primary" />
              Estado de la Marca
            </h4>
            <div className="space-y-4">
              {[
                { label: "Visibilidad Web", val: "85%", color: "bg-andina-primary" },
                { label: "Autoridad SEO", val: "62%", color: "bg-andina-accent" },
                { label: "Engagement Social", val: "40%", color: "bg-blue-500" }
              ].map(stat => (
                <div key={stat.label}>
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider mb-1">
                    <span className="text-andina-text/40">{stat.label}</span>
                    <span className="text-white">{stat.val}</span>
                  </div>
                  <div className="h-1 bg-andina-bg rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color} rounded-full`} style={{ width: stat.val }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-andina-primary/20 to-andina-accent/20 border border-andina-primary/30 rounded-2xl p-6">
            <h4 className="text-white font-bold mb-2">Tips de Autoridad</h4>
            <p className="text-sm text-andina-text/70 leading-relaxed italic">
              "Publicar testimonios de padres de familia una vez por semana incrementa la confianza en un 45%."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
