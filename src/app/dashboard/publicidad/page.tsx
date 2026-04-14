"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Image as ImageIcon, Link as LinkIcon, Save, Eye, Smartphone, Tv, Zap, Layout, X, Check } from "lucide-react";
import { useState, useEffect } from "react";

// Mock de imágenes premium para la galería
const PREMIUM_GALLERY = [
  "/hero-buseta.png",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=2000"
];

export default function PublicidadPage() {
  const [adState, setAdState] = useState({
    heading: "LOJA AL SIGUIENTE NIVEL",
    subheading: "Tu seguridad es nuestra mayor inversión. 74 busetas listas para llevarte a tu destino.",
    cta: "Viaja con Nosotros",
    link: "/contacto",
    mediaUrl: PREMIUM_GALLERY[0]
  });

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Cargar estado inicial de localStorage si existe
  useEffect(() => {
    const saved = localStorage.getItem("podocarpus_active_ad");
    if (saved) {
      setAdState(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("podocarpus_active_ad", JSON.stringify(adState));
      // Disparar evento para que otras pestañas se enteren
      window.dispatchEvent(new Event("storage"));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-white tracking-tighter uppercase">
            Publicidad Dinámica
          </h1>
          <p className="text-andina-text/50 font-mono text-xs uppercase tracking-widest mt-1">
            Sincronización en Tiempo Real con la Web
          </p>
        </div>
        <div className="flex gap-4">
           <a 
            href="/promociones" 
            target="_blank"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-andina-text transition-all"
           >
             <Eye size={16} />
             Ver en la Web
           </a>
           <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-andina-primary hover:bg-andina-primary/90 px-6 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-lg shadow-andina-primary/20 disabled:opacity-50"
           >
             {isSaving ? <Zap size={16} className="animate-spin" /> : <Save size={16} />}
             {isSaving ? "Publicando..." : "Publicar Cambios"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Side */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-andina-surface border border-andina-border rounded-2xl p-6 space-y-6">
            <h3 className="text-white font-bold flex items-center gap-2 mb-2">
              <Layout size={18} className="text-andina-primary" />
              Editor de Valla Digital
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Encabezado Principal</label>
                  <input 
                    type="text" 
                    value={adState.heading}
                    onChange={(e) => setAdState({...adState, heading: e.target.value})}
                    className="w-full bg-andina-bg border border-andina-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-andina-primary/50 transition-all font-heading font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Texto Secundario</label>
                  <textarea 
                    rows={4}
                    value={adState.subheading}
                    onChange={(e) => setAdState({...adState, subheading: e.target.value})}
                    className="w-full bg-andina-bg border border-andina-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-andina-primary/50 transition-all text-sm leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Imagen de Fondo (Billboard)</label>
                   <div 
                    onClick={() => setIsGalleryOpen(true)}
                    className="aspect-video bg-andina-bg border-2 border-dashed border-andina-border rounded-xl relative overflow-hidden group hover:border-andina-primary/50 transition-all cursor-pointer"
                   >
                     <img src={adState.mediaUrl} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50 group-hover:text-white transition-colors">
                        <ImageIcon size={32} />
                        <span className="text-[10px] font-bold">Cambiar Imagen</span>
                     </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Texto Botón</label>
                    <input 
                      type="text" 
                      value={adState.cta}
                      onChange={(e) => setAdState({...adState, cta: e.target.value})}
                      className="w-full bg-andina-bg border border-andina-border rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Enlace (URL)</label>
                    <div className="relative">
                      <LinkIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-andina-text/20" />
                      <input 
                        type="text" 
                        value={adState.link}
                        onChange={(e) => setAdState({...adState, link: e.target.value})}
                        className="w-full bg-andina-bg border border-andina-border rounded-xl pl-8 pr-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-andina-bg border border-andina-border rounded-3xl p-8 relative overflow-hidden h-[500px] shadow-2xl">
             <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-andina-text/20" />
                <div className="w-8 h-1.5 rounded-full bg-andina-primary" />
                <div className="w-1.5 h-1.5 rounded-full bg-andina-text/20" />
             </div>
             
             <div className="relative h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="absolute inset-0 z-0 opacity-40">
                   <div className="absolute inset-0 bg-gradient-to-t from-andina-bg to-transparent" />
                   <img src={adState.mediaUrl} className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="relative z-10 p-6">
                   <h2 className="text-3xl font-heading font-black text-white leading-tight mb-4">{adState.heading}</h2>
                   <p className="text-xs text-andina-text/60 mb-6 line-clamp-2 leading-relaxed">{adState.subheading}</p>
                   <div className="inline-block bg-andina-primary px-8 py-3 rounded-xl text-xs font-bold text-white shadow-xl">
                      {adState.cta}
                   </div>
                </div>
             </div>

             <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-6 z-20 text-andina-text/20">
                <Smartphone size={20} className="text-andina-primary" />
                <Monitor size={20} />
                <Tv size={20} />
             </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-andina-bg/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-andina-surface border border-andina-border rounded-3xl w-full max-w-4xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Galería de Imágenes Premium</h3>
                <button onClick={() => setIsGalleryOpen(false)} className="text-andina-text/40 hover:text-white transition-colors">
                  <X />
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {PREMIUM_GALLERY.map((img) => (
                  <div 
                    key={img}
                    onClick={() => {
                      setAdState({...adState, mediaUrl: img});
                      setIsGalleryOpen(false);
                    }}
                    className={`aspect-video rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${adState.mediaUrl === img ? 'border-andina-primary' : 'border-transparent'}`}
                  >
                    <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-50 bg-andina-primary px-6 py-4 rounded-2xl flex items-center gap-4 text-white font-bold shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check size={18} />
            </div>
            Publicidad Actualizada Correctamente
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
