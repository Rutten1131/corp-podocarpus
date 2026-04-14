"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Image as ImageIcon, Link as LinkIcon, Save, Eye, Smartphone, Tv, Zap, Layout, X, Check, Users } from "lucide-react";
import { useState, useEffect } from "react";

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Mock de imágenes y videos premium para la galería
const PREMIUM_GALLERY = [
  { type: "image", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000", heading: "Explora Loja", subheading: "La Capital Musical del Ecuador te espera con paisajes increíbles." },
  { type: "video", url: "https://videos.pexels.com/video-files/5536120/5536120-uhd_2560_1440_25fps.mp4", heading: "Servicio de Calidad", subheading: "Comprometidos con tu seguridad en cada kilómetro." },
  { type: "video", url: "https://videos.pexels.com/video-files/3831776/3831776-uhd_2560_1440_30fps.mp4", heading: "Rutas Seguras", subheading: "Conectando la sierra con el corazón de nuestra gente." },
  { type: "image", url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000", heading: "Transporte Moderno", subheading: "Unidades equipadas con la mejor tecnología para tu confort." },
  { type: "image", url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=2000", heading: "Tu Destino, Nuestra Pasión", subheading: "Más que un viaje, una experiencia inolvidable." },
  { type: "image", url: "https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&q=80&w=2000", heading: "Cooperativa Podocarpus", subheading: "Desde Loja para todo el país, con orgullo y tradición." }
];

export default function PublicidadPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [adState, setAdState] = useState({
    heading: "Socio Estratégico del Mes: ServiLoja",
    subheading: "Impulsa tu marca ante miles de usuarios diarios. Este banner genera ingresos directos para el Fondo de Mantenimiento.",
    mediaUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
    mediaType: "image",
    cta: "Contactar Ahora",
    link: "#"
  });
  const [sponsors, setSponsors] = useState<any[]>([]);

  // Cargar estado inicial de localStorage si existe
  useEffect(() => {
    const savedAd = localStorage.getItem("podocarpus_active_ad");
    if (savedAd) {
      setAdState(JSON.parse(savedAd));
    }

    const savedSponsors = localStorage.getItem("podocarpus_sponsors");
    if (savedSponsors) {
      setSponsors(JSON.parse(savedSponsors));
    } else {
      const defaults = [
        { name: "Reserva Natural Podocarpus", image: "https://i.pinimg.com/1200x/81/04/09/8104098f36e1a72a360f4e0ae1f6af85.jpg", link: "#" },
        { name: "Loja - Ciudad Castellana", image: "https://i.pinimg.com/1200x/22/e9/70/22e9707022c7f280eba0d32b9407eac0.jpg", link: "#" },
        { name: "Cultura y Tradición", image: "https://i.pinimg.com/736x/7a/66/a3/7a66a3d0f4c2a67a9f679d8fd9a9dc59.jpg", link: "#" },
        { name: "Belleza Andina", image: "https://i.pinimg.com/1200x/4d/49/c3/4d49c3d220f17f5229e85172a4176fdf.jpg", link: "#" }
      ];
      setSponsors(defaults);
      localStorage.setItem("podocarpus_sponsors", JSON.stringify(defaults));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("podocarpus_active_ad", JSON.stringify(adState));
      localStorage.setItem("podocarpus_sponsors", JSON.stringify(sponsors));
      window.dispatchEvent(new Event("storage"));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const addSponsor = () => {
    const newSponsor = { name: "Nuevo Sponsor", image: "", link: "#" };
    const updated = [...sponsors, newSponsor];
    setSponsors(updated);
    localStorage.setItem("podocarpus_sponsors", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const updateSponsor = (index: number, field: string, value: string) => {
    const updated = [...sponsors];
    updated[index] = { ...updated[index], [field]: value };
    setSponsors(updated);
    localStorage.setItem("podocarpus_sponsors", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const deleteSponsor = (index: number) => {
    const updated = sponsors.filter((_, i) => i !== index);
    setSponsors(updated);
    localStorage.setItem("podocarpus_sponsors", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative pb-20">
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
            href="/" 
            target="_blank"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-andina-text transition-all"
           >
             <Eye size={16} />
             Ver Web
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
                    rows={2}
                    value={adState.subheading}
                    onChange={(e) => setAdState({...adState, subheading: e.target.value})}
                    className="w-full bg-andina-bg border border-andina-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-andina-primary/50 transition-all text-sm leading-relaxed"
                  />
                </div>
                <div>
                   <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">URL Media</label>
                   <input 
                    type="text" 
                    value={adState.mediaUrl}
                    onChange={(e) => {
                      const url = e.target.value;
                      const isVideo = url.includes('.mp4') || url.includes('youtube.com') || url.includes('youtu.be');
                      setAdState({...adState, mediaUrl: url, mediaType: isVideo ? 'video' : 'image'});
                    }}
                    className="w-full bg-andina-bg border border-andina-border rounded-xl px-4 py-3 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Preview Fondo</label>
                   <div 
                    onClick={() => setIsGalleryOpen(true)}
                    className="aspect-video bg-andina-bg border-2 border-dashed border-andina-border rounded-xl relative overflow-hidden group hover:border-andina-primary/50 transition-all cursor-pointer"
                   >
                     {adState.mediaUrl ? (
                       adState.mediaType === "video" ? (
                         <video src={adState.mediaUrl} muted loop autoPlay className="absolute inset-0 w-full h-full object-cover opacity-40" />
                       ) : (
                         <img src={adState.mediaUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                       )
                     ) : null}
                     <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50 group-hover:text-white transition-colors">
                        {adState.mediaType === "video" ? <Tv size={32} /> : <ImageIcon size={32} />}
                        <span className="text-[10px] font-bold uppercase tracking-widest">Cambiar</span>
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
                    <label className="block text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-2">Enlace</label>
                    <input 
                      type="text" 
                      value={adState.link}
                      onChange={(e) => setAdState({...adState, link: e.target.value})}
                      className="w-full bg-andina-bg border border-andina-border rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsors Management Section */}
          <div className="bg-andina-surface border border-andina-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Users size={18} className="text-andina-primary" />
                Gestión de Sponsors (Aliados Estratégicos)
              </h3>
              <button 
                onClick={addSponsor}
                className="bg-andina-primary/10 hover:bg-andina-primary/20 text-andina-primary px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border border-andina-primary/30"
              >
                + Añadir Sponsor
              </button>
            </div>

            <div className="space-y-4">
              {sponsors.map((sponsor, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-andina-bg/40 p-4 rounded-xl border border-andina-border/50 group"
                >
                  <div className="md:col-span-1">
                    <label className="block text-[9px] text-andina-text/30 font-mono uppercase tracking-widest mb-2">Logo (URL)</label>
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        {sponsor.image ? <img src={sponsor.image} className="w-full h-full object-contain" /> : <ImageIcon size={14} className="text-white/10" />}
                      </div>
                      <input 
                        type="text" 
                        value={sponsor.image}
                        onChange={(e) => updateSponsor(idx, 'image', e.target.value)}
                        className="w-full bg-andina-bg border border-andina-border rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[9px] text-andina-text/30 font-mono uppercase tracking-widest mb-2">Nombre</label>
                    <input 
                      type="text" 
                      value={sponsor.name}
                      onChange={(e) => updateSponsor(idx, 'name', e.target.value)}
                      className="w-full bg-andina-bg border border-andina-border rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[9px] text-andina-text/30 font-mono uppercase tracking-widest mb-2">Enlace</label>
                    <input 
                      type="text" 
                      value={sponsor.link}
                      onChange={(e) => updateSponsor(idx, 'link', e.target.value)}
                      className="w-full bg-andina-bg border border-andina-border rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => deleteSponsor(idx)}
                      className="p-2 text-andina-text/20 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24">
            <div className="bg-andina-bg border border-andina-border rounded-3xl p-8 relative overflow-hidden h-[500px] shadow-2xl">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-andina-text/20" />
                  <div className="w-8 h-1.5 rounded-full bg-andina-primary" />
                  <div className="w-1.5 h-1.5 rounded-full bg-andina-text/20" />
              </div>
              
              <div className="relative h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-t from-andina-bg to-transparent" />
                    {adState.mediaUrl && (
                      adState.mediaType === "video" ? (
                          adState.mediaUrl.includes('youtube.com') || adState.mediaUrl.includes('youtu.be') ? (
                            <div className="w-full h-full pointer-events-none scale-150">
                              <iframe 
                                src={`https://www.youtube.com/embed/${getYouTubeId(adState.mediaUrl)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${getYouTubeId(adState.mediaUrl)}`}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                              />
                            </div>
                          ) : (
                            <video src={adState.mediaUrl} muted loop autoPlay className="w-full h-full object-cover rounded-2xl" />
                          )
                      ) : (
                        <img src={adState.mediaUrl} className="w-full h-full object-cover rounded-2xl" />
                      )
                    )}
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
            
            <div className="mt-6 bg-andina-surface border border-andina-border rounded-3xl p-6 overflow-hidden">
               <h4 className="text-[10px] font-mono text-andina-text/40 uppercase tracking-[0.2em] mb-4">Vista Previa Sponsors</h4>
               <div className="flex gap-4 overflow-hidden mask-fade-edges">
                  {sponsors.map((s, i) => (
                    <div key={i} className="flex-shrink-0 w-12 h-12 rounded-full border border-white/5 bg-white/5 p-2 grayscale">
                      <img src={s.image} className="w-full h-full object-contain" />
                    </div>
                  ))}
               </div>
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
                {PREMIUM_GALLERY.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      setAdState({
                        ...adState, 
                        mediaUrl: item.url, 
                        mediaType: item.type as any,
                        heading: item.heading || adState.heading,
                        subheading: item.subheading || adState.subheading
                      });
                      setIsGalleryOpen(false);
                    }}
                    className={`aspect-video rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group relative ${adState.mediaUrl === item.url ? 'border-andina-primary' : 'border-transparent'}`}
                  >
                    {item.type === "video" ? (
                      <video src={item.url} muted className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <img src={item.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    )}
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                       {item.type}
                    </div>
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
