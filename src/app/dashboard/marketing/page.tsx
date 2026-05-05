"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, PenTool, Share2, Calendar, Sparkles, Send, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";


export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("contenido");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handlePublish = async () => {
    if (!title || !content) {
      setPublishStatus({ type: 'error', message: 'Por favor completa el título y el contenido.' });
      return;
    }

    // Validar que mediaUrl no sea data URL (base64) — Make no puede procesarlo
    let finalMediaUrl = mediaUrl;
    if (finalMediaUrl.startsWith("data:")) {
      setPublishStatus({
        type: 'error',
        message: '❌ La imagen subida no tiene una URL pública. Make.com necesita un enlace accesible. Pega una URL directa en el campo de texto.'
      });
      return;
    }

    setIsPublishing(true);
    setPublishStatus(null);

    try {
      const response = await fetch('/api/marketing/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          mediaUrl: finalMediaUrl,
          platforms: ["facebook"]
        })
      });

      const data = await response.json();

      if (data.success) {
        setPublishStatus({ type: 'success', message: '¡Autoridad publicada con éxito!' });
        // Optionally clear form
        // setTitle("");
        // setContent("");
        // setMediaUrl("");
      } else {
        throw new Error(data.error || 'Error al publicar');
      }
    } catch (error: any) {
      setPublishStatus({ type: 'error', message: error.message });
    } finally {
      setIsPublishing(false);
    }
  };

  const [mediaPreview, setMediaPreview] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Mostrar advertencia al usuario
      setPublishStatus({
        type: 'error',
        message: '⚠️ Make.com necesita una URL pública. Usa el campo "Pegar URL" arriba, o sube la imagen a un servicio como Imgur, PostImage, etc. y pega el enlace.'
      });
    }
  };


  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Marketing de <span className="text-andina-primary">Autoridad</span>
          </h1>
          <p className="text-andina-text/60 font-mono text-[10px] uppercase tracking-[0.3em] mt-2 font-bold flex items-center gap-2">
            <Sparkles size={12} className="text-andina-primary" /> Generador de influencia estratégica andina
          </p>
        </div>
        <div className="p-1.5 bg-andina-surface/60 backdrop-blur-xl border border-white/5 rounded-[1.25rem] flex items-center gap-1 shadow-2xl">
          {[
            { id: "contenido", label: "Artículos", icon: PenTool },
            { id: "social", label: "Social Hub", icon: Share2 },
            { id: "calendario", label: "Estrategia", icon: Calendar }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeTab === tab.id 
                  ? "bg-andina-primary text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-105" 
                  : "text-andina-text/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon size={14} className={activeTab === tab.id ? "animate-pulse" : ""} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Workspace */}
        <div className="xl:col-span-3 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === "calendario" && (
              <motion.div 
                key="calendario"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-andina-surface/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-andina-accent/10 flex items-center justify-center text-andina-accent border border-andina-accent/20">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight">Calendario de Autoridad</h3>
                      <p className="text-[10px] font-bold text-andina-text/40 uppercase tracking-widest">Planificación estratégica de contenidos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-2 bg-black/40 rounded-2xl border border-white/5">
                     <span className="text-xs font-black text-white px-4 font-mono">ABRIL 2026</span>
                     <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-xl text-andina-primary transition-colors">{"<"}</button>
                        <button className="p-2 hover:bg-white/10 rounded-xl text-andina-primary transition-colors">{">"}</button>
                     </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-7 gap-px bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden shadow-Inner">
                    {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
                      <div key={day} className="bg-black/40 p-4 text-center text-[10px] font-black text-andina-primary uppercase tracking-[0.2em]">{day}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => {
                      const dayNum = i - 2;
                      const isToday = dayNum === 14;
                      const hasEvent = [14, 16, 20, 25].includes(dayNum);
                      return (
                        <div key={i} className={`bg-andina-surface/60 min-h-[100px] md:min-h-[140px] p-4 relative group hover:bg-white/5 transition-all duration-500 ${dayNum <= 0 || dayNum > 30 ? 'opacity-5' : ''}`}>
                           {dayNum > 0 && dayNum <= 30 && (
                             <>
                               <span className={`text-xs font-mono font-black ${isToday ? 'text-andina-primary scale-125' : 'text-andina-text/30'}`}>
                                 {dayNum < 10 ? `0${dayNum}` : dayNum}
                                 {isToday && <div className="w-1.5 h-1.5 bg-andina-primary rounded-full absolute top-4 right-4 animate-ping" />}
                               </span>
                               {hasEvent && (
                                 <div className="mt-3 space-y-1.5">
                                    <div className={`text-[9px] p-2 rounded-xl backdrop-blur-md ${dayNum === 14 ? 'bg-andina-primary/10 text-andina-primary border border-andina-primary/30' : 'bg-andina-accent/10 text-andina-accent border border-andina-accent/30'} font-black leading-tight uppercase tracking-tighter shadow-xl`}>
                                       {dayNum === 14 ? "Promo Escolar" : "Post: Seguridad"}
                                    </div>
                                    {dayNum === 25 && (
                                      <div className="text-[9px] p-2 rounded-xl bg-white/5 text-white/40 border border-white/10 font-black leading-tight uppercase tracking-tighter">Video Intro</div>
                                    )}
                                 </div>
                               )}
                             </>
                           )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "contenido" && (
              <motion.div 
                key="contenido"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-andina-surface/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-andina-primary/10 flex items-center justify-center text-andina-primary border border-andina-primary/20">
                      <PenTool size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight italic">Zen Editor IA</h3>
                      <p className="text-[10px] font-bold text-andina-text/40 uppercase tracking-widest font-mono">Generación de contenido sin distracciones</p>
                    </div>
                  </div>
                  <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-andina-primary hover:bg-andina-primary/10 px-4 py-2 rounded-xl border border-andina-primary/20 transition-all">
                    <Sparkles size={14} /> Sugerir Temas
                  </button>
                </div>
                <div className="p-8 space-y-8">
                  <div className="relative group">
                    <label className="absolute -top-3 left-6 text-[9px] text-andina-primary bg-[#050a08] px-3 font-black uppercase tracking-[0.2em] border border-andina-primary/20 rounded-full">Encabezado de Autoridad</label>
                    <input 
                      type="text" 
                      placeholder="Título estratégico..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-6 text-xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-andina-primary/40 transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <label className="absolute -top-3 left-6 text-[9px] text-andina-text/40 bg-[#050a08] px-3 font-black uppercase tracking-[0.2em] border border-white/10 rounded-full">Borrador de Ingeniería Social</label>
                      <textarea 
                        rows={14}
                        placeholder="Empiece a redactar con el tono de voz de Podocarpus..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-8 text-lg font-medium text-andina-text/80 placeholder:text-white/10 focus:outline-none focus:border-andina-primary/40 transition-all shadow-inner resize-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="relative group">
                        <label className="absolute -top-3 left-6 text-[9px] text-andina-text/40 bg-[#050a08] px-3 font-black uppercase tracking-[0.2em] border border-white/10 rounded-full">Multimedia (URL o Archivo)</label>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="https://ejemplo.com/imagen.jpg (URL pública para Make)"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white placeholder:text-white/10 focus:outline-none focus:border-andina-primary/40 transition-all shadow-inner"
                          />
                          <div className="flex items-center gap-4">
                            <label className="flex-1 cursor-pointer group/upload">
                              <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-andina-primary/40 hover:bg-andina-primary/5 transition-all">
                                <ImageIcon size={24} className="text-andina-text/20 group-hover/upload:text-andina-primary transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-andina-text/40">Subir Archivo</span>
                              </div>
                              <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Preview: prioriza la URL real, sino la previsualización del archivo */}
                      {(mediaUrl || mediaPreview) && (
                        <div className="aspect-video bg-black/40 border border-white/5 rounded-3xl overflow-hidden relative group">
                          {(mediaUrl || mediaPreview).startsWith('data:video') ? (
                            <video src={mediaUrl || mediaPreview} className="w-full h-full object-cover" controls />
                          ) : (
                            <img src={mediaUrl || mediaPreview} alt="Preview" className="w-full h-full object-cover" />
                          )}
                          <button 
                            onClick={() => { setMediaUrl(""); setMediaPreview(""); }}
                            className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-xl text-white/40 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Plus size={16} className="rotate-45" />
                          </button>
                          {mediaPreview && !mediaUrl && (
                            <div className="absolute bottom-4 left-4 right-4 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 rounded-xl px-4 py-2 text-[9px] font-black text-yellow-400 uppercase tracking-wider text-center">
                              ⚠️ Solo para previsualización. Make necesita una URL pública.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {publishStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border ${
                        publishStatus.type === 'success' 
                          ? 'bg-andina-primary/10 border-andina-primary/20 text-andina-primary' 
                          : 'bg-red-500/10 border-red-500/20 text-red-500'
                      } text-xs font-black uppercase tracking-widest text-center`}
                    >
                      {publishStatus.message}
                    </motion.div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-end gap-6 items-center">
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-andina-text/20 hover:text-white transition-colors">Guardar en Nube</button>
                    <button 
                      onClick={handlePublish}
                      disabled={isPublishing}
                      className="w-full sm:w-auto bg-andina-primary px-10 py-5 rounded-2xl text-white text-xs font-black uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPublishing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      {isPublishing ? "Publicando..." : "Publicar Autoridad"}
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {activeTab === "social" && (
              <motion.div 
                key="social"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {[1, 2].map((i) => (
                  <div key={i} className="bg-andina-surface/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                       <Megaphone size={100} />
                    </div>
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[9px] bg-andina-primary/10 border border-andina-primary/20 px-4 py-1.5 rounded-full text-andina-primary font-black uppercase tracking-[0.2em]">PROGRAMADO • 15:30</span>
                      <div className="flex gap-2">
                        <button className="p-2 text-andina-text/20 hover:text-white transition-colors"><Share2 size={18} /></button>
                      </div>
                    </div>
                    <div className="aspect-[16/10] bg-black/60 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group/img shadow-2xl">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       <Sparkles size={40} className="text-white/5 group-hover/img:scale-150 transition-transform duration-1000" />
                       <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-[9px] font-black text-andina-primary uppercase tracking-widest mb-1">Visual IA</p>
                          <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden">
                             <div className="h-full bg-andina-primary w-2/3 shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
                          </div>
                       </div>
                    </div>
                    <p className="text-base font-bold text-andina-text/80 leading-snug line-clamp-2 italic tracking-tight">"La seguridad de nuestros estudiantes es la base de nuestra autoridad en el transporte escolar de Loja."</p>
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-andina-text/40">Multi-Channel</span>
                      </div>
                      <button className="text-andina-primary text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Configurar</button>
                    </div>
                  </div>
                ))}
                <button className="aspect-[16/10] md:aspect-auto border-2 border-dashed border-white/10 rounded-[2.5rem] bg-white/5 flex flex-col items-center justify-center gap-4 text-andina-text/30 hover:text-andina-primary hover:border-andina-primary/40 hover:bg-andina-primary/5 transition-all group shadow-Inner">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-andina-primary/20 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <Plus size={32} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.3em] font-mono">Nueva Campaña</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Intelligence */}
        <div className="space-y-8">
          <div className="bg-andina-surface/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.1em] mb-8 flex items-center gap-3">
              <Sparkles size={18} className="text-andina-primary animate-pulse" />
              Métricas de Autoridad
            </h4>
            <div className="space-y-8">
              {[
                { label: "Influencia Web", val: "85%", color: "bg-andina-primary" },
                { label: "Domino SEO", val: "62%", color: "bg-andina-accent" },
                { label: "Impacto Social", val: "78%", color: "bg-blue-500" }
              ].map(stat => (
                <div key={stat.label} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-andina-text/40">{stat.label}</span>
                    <span className="text-lg font-black text-white tracking-tighter group-hover:text-andina-primary transition-colors">{stat.val}</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div className={`h-full ${stat.color} rounded-full shadow-lg transition-all duration-1000 group-hover:brightness-125`} style={{ width: stat.val }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0a140f] to-[#0a0c14] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:scale-125 transition-transform duration-700">
               <Megaphone size={80} />
            </div>
            <h4 className="text-andina-primary text-[10px] font-black uppercase tracking-[0.3em] font-mono mb-4">Estrategia Táctica</h4>
            <p className="text-base font-black text-white leading-snug tracking-tight italic drop-shadow-lg">
              "El 70% de la autoridad se construye con la consistencia visual y la respuesta inmediata a los retos del mercado."
            </p>
            <div className="mt-8 flex justify-between items-center">
               <span className="text-[9px] font-black text-andina-text/40 uppercase tracking-widest">Manual de Marca v.2</span>
               <div className="w-8 h-1 bg-andina-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
