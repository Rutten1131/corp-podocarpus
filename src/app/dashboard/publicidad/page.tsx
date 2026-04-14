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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000 relative pb-20">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Carteler&iacute;a <span className="text-andina-primary">Multimedia</span>
          </h1>
          <p className="text-andina-text/60 font-mono text-[10px] uppercase tracking-[0.3em] mt-2 font-bold flex items-center gap-2">
            <Zap size={12} className="text-andina-primary animate-pulse" /> Sincronizaci&oacute;n estratégica en tiempo real
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 p-2 bg-andina-surface/60 backdrop-blur-xl border border-white/5 rounded-[1.5rem] shadow-2xl">
           <a 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-andina-text/60 hover:text-white hover:bg-white/5 transition-all active:scale-95"
           >
             <Eye size={18} /> Ver Directo
           </a>
           <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-3 bg-andina-primary px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-andina-primary/20 disabled:opacity-50 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] active:scale-95 group"
           >
             {isSaving ? <Zap size={18} className="animate-spin" /> : <Save size={18} className="group-hover:rotate-12 transition-transform" />}
             {isSaving ? "Sincronizando..." : "Publicar Cambios"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Editor Side */}
        <div className="xl:col-span-12 2xl:col-span-7 space-y-10">
          <div className="bg-andina-surface/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
               <Layout size={100} />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight italic flex items-center gap-3 relative z-10">
              <div className="w-1.5 h-6 bg-andina-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
              Consola del Panel Digital
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <div className="space-y-6">
                <div className="relative">
                  <label className="absolute -top-3 left-4 text-[9px] text-andina-primary bg-[#050a08] px-3 font-black uppercase tracking-[0.2em] border border-andina-primary/20 rounded-full">Encabezado de Impacto</label>
                  <input 
                    type="text" 
                    value={adState.heading}
                    onChange={(e) => setAdState({...adState, heading: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-black text-lg focus:outline-none focus:border-andina-primary/40 transition-all shadow-inner"
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-3 left-4 text-[9px] text-andina-text/40 bg-[#050a08] px-3 font-black uppercase tracking-[0.2em] border border-white/10 rounded-full">Mensaje Persuasivo</label>
                  <textarea 
                    rows={3}
                    value={adState.subheading}
                    onChange={(e) => setAdState({...adState, subheading: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-medium leading-relaxed focus:outline-none focus:border-andina-primary/40 transition-all shadow-inner resize-none"
                  />
                </div>
                <div className="relative">
                   <label className="absolute -top-3 left-4 text-[9px] text-andina-text/40 bg-[#050a08] px-3 font-black uppercase tracking-[0.2em] border border-white/10 rounded-full">Fuente Multimedia</label>
                   <div className="flex items-center gap-2">
                     <div className="flex-1 relative">
                       <input 
                        type="text" 
                        value={adState.mediaUrl}
                        onChange={(e) => {
                          const url = e.target.value;
                          const isVideo = url.includes('.mp4') || url.includes('youtube.com') || url.includes('youtu.be');
                          setAdState({...adState, mediaUrl: url, mediaType: isVideo ? 'video' : 'image'});
                        }}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-10 pr-4 py-4 text-white text-[10px] font-bold font-mono focus:outline-none focus:border-andina-primary/40 transition-all shadow-inner"
                      />
                      <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-andina-primary" />
                     </div>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative group/preview">
                   <label className="absolute -top-3 left-4 text-[9px] text-andina-text/40 bg-[#050a08] px-3 font-black uppercase tracking-[0.2em] border border-white/10 rounded-full z-20">Vista T&aacute;ctica</label>
                   <div 
                    onClick={() => setIsGalleryOpen(true)}
                    className="aspect-video bg-black/60 border-2 border-dashed border-white/5 rounded-3xl relative overflow-hidden group hover:border-andina-primary/40 transition-all cursor-pointer shadow-Inner group-hover/preview:shadow-[0_0_30px_rgba(0,0,0,1)]"
                   >
                     {adState.mediaUrl ? (
                       adState.mediaType === "video" ? (
                         <video src={adState.mediaUrl} muted loop autoPlay className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[2px] scale-110" />
                       ) : (
                         <img src={adState.mediaUrl} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[2px] scale-110" />
                       )
                     ) : null}
                     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/50 group-hover:text-andina-primary transition-all duration-700">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-andina-primary group-hover:text-white transition-all shadow-2xl">
                          {adState.mediaType === "video" ? <Tv size={32} className="animate-pulse" /> : <ImageIcon size={32} />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explorar Galer&iacute;a Podocarpus</span>
                     </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="absolute -top-3 left-4 text-[9px] text-andina-text/20 bg-[#050a08] px-3 font-black uppercase tracking-[0.2em]">Acci&oacute;n</label>
                    <input 
                      type="text" 
                      value={adState.cta}
                      onChange={(e) => setAdState({...adState, cta: e.target.value})}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-[10px] font-black text-white uppercase tracking-widest"
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute -top-3 left-4 text-[9px] text-andina-text/20 bg-[#050a08] px-3 font-black uppercase tracking-[0.2em]">V&iacute;nculo</label>
                    <input 
                      type="text" 
                      value={adState.link}
                      onChange={(e) => setAdState({...adState, link: e.target.value})}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-andina-surface/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 space-y-10 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white tracking-tight italic flex items-center gap-3">
                <div className="w-1.5 h-6 bg-andina-primary rounded-full"></div>
                Ecosistema de Sponsors
              </h3>
              <button 
                onClick={addSponsor}
                className="bg-andina-primary px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all active:scale-95"
              >
                + Registrar Aliado
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 overflow-y-auto max-h-[400px] scrollbar-hide pr-2">
              {sponsors.map((sponsor, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-black/30 border border-white/5 rounded-3xl p-6 space-y-4 hover:border-andina-primary/30 transition-all group/sponsor shadow-xl"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover/sponsor:scale-110 transition-transform">
                      {sponsor.image ? <img src={sponsor.image} className="w-full h-full object-contain" /> : <ImageIcon size={20} className="text-white/10" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <input 
                        type="text" 
                        value={sponsor.name}
                        onChange={(e) => updateSponsor(idx, 'name', e.target.value)}
                        className="w-full bg-transparent border-none text-white font-black text-sm p-0 focus:ring-0 placeholder:text-white/10"
                        placeholder="Nombre comercial"
                      />
                      <input 
                        type="text" 
                        value={sponsor.link}
                        onChange={(e) => updateSponsor(idx, 'link', e.target.value)}
                        className="w-full bg-transparent border-none text-andina-text/40 font-bold text-[9px] p-0 focus:ring-0 uppercase tracking-widest placeholder:text-white/5"
                        placeholder="URL de destino"
                      />
                    </div>
                    <button 
                      onClick={() => deleteSponsor(idx)}
                      className="p-3 text-andina-text/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="relative">
                    <label className="block text-[8px] text-andina-text/20 font-black uppercase tracking-[0.2em] mb-2 font-mono italic">Identidad Visual (.png / .jpg)</label>
                    <input 
                      type="text" 
                      value={sponsor.image}
                      onChange={(e) => updateSponsor(idx, 'image', e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-[9px] font-bold text-white/30 focus:outline-none focus:border-andina-primary/40 font-mono italic truncate"
                      placeholder="https://servidor.com/imagen.png"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Side (Desktop Overlay Concept) */}
        <div className="xl:col-span-12 2xl:col-span-5 space-y-6">
          <div className="2xl:sticky 2xl:top-10">
            <div className="bg-[#050a08]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-4 relative overflow-hidden h-[600px] shadow-3xl group shadow-[0_0_100px_rgba(0,0,0,1)]">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-12 h-2 rounded-full bg-andina-primary shadow-[0_0_10px_rgba(34,197,94,1)]" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>

              <div className="absolute inset-4 rounded-[2.5rem] bg-black overflow-hidden shadow-Inner">
                  <div className="absolute inset-0 z-0 scale-105 group-hover:scale-110 transition-transform duration-[20s] linear">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-black/60 z-0 backdrop-grayscale" />
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
                            <video src={adState.mediaUrl} muted loop autoPlay className="w-full h-full object-cover" />
                          )
                      ) : (
                        <img src={adState.mediaUrl} className="w-full h-full object-cover" />
                      )
                    )}
                  </div>
                  
                  <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-12 space-y-8 animate-in fade-in duration-1000">
                      <p className="text-andina-primary text-[10px] font-black uppercase tracking-[0.4em] font-mono animate-pulse font-bold flex items-center gap-3">
                         <Monitor size={14} /> LIVE BOARD PREVIEW
                      </p>
                      <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl italic">{adState.heading}</h2>
                      <p className="text-base text-white/50 font-medium leading-relaxed max-w-sm line-clamp-3">{adState.subheading}</p>
                      <button className="bg-andina-primary px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl hover:brightness-125 transition-all active:scale-95 group/btn overflow-hidden relative">
                         <span className="relative z-10">{adState.cta}</span>
                         <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                      </button>
                  </div>

                  <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-center z-30">
                      <div className="flex gap-4 text-white/20">
                         <Smartphone size={24} className="text-andina-primary" />
                         <Monitor size={24} />
                         <Tv size={24} />
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-black text-white/40 uppercase tracking-widest font-mono">
                         Sincronizado <div className="w-2 h-2 rounded-full bg-andina-primary shadow-[0_0_8px_rgba(34,197,94,1)]" />
                      </div>
                  </div>
              </div>
            </div>
            
            <div className="mt-8 bg-andina-surface/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
               <h4 className="text-[10px] font-black text-andina-text/40 uppercase tracking-[0.3em] font-mono mb-6 text-center italic">Carrusel de Aliados Web</h4>
               <div className="flex flex-wrap items-center justify-center gap-6 opacity-30 group-hover:opacity-100 transition-opacity duration-1000 grayscale hover:grayscale-0">
                  {sponsors.map((s, i) => (
                    <div key={i} className="w-16 h-16 rounded-2xl border border-white/5 bg-black/40 p-4 transition-all hover:scale-125 hover:rotate-6">
                      <img src={s.image} className="w-full h-full object-contain" />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal Editorial */}
      <AnimatePresence>
        {isGalleryOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#050a08] border border-white/10 rounded-[3rem] w-full max-w-5xl p-10 shadow-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <ImageIcon size={200} />
              </div>
              
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                   <h3 className="text-3xl font-black text-white tracking-tighter">Galer&iacute;a de <span className="text-andina-primary">Autoridad</span></h3>
                   <p className="text-[10px] font-black text-andina-text/40 uppercase tracking-[0.3em] font-mono mt-2">Selección curada de media premium para vallas digitales</p>
                </div>
                <button onClick={() => setIsGalleryOpen(false)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 scrollbar-hide overflow-y-auto max-h-[60vh] p-2">
                {PREMIUM_GALLERY.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05, rotate: 1 }}
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
                    className={`aspect-video rounded-3xl overflow-hidden cursor-pointer border-2 transition-all group relative active:scale-95 shadow-2xl ${adState.mediaUrl === item.url ? 'border-andina-primary shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'border-white/5 hover:border-andina-primary/30'}`}
                  >
                    {item.type === "video" ? (
                      <video src={item.url} muted className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-125" />
                    ) : (
                      <img src={item.url} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-125" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-6 right-6">
                       <p className="text-[8px] font-black text-andina-primary uppercase tracking-[0.2em] mb-1 font-mono">{item.type}</p>
                       <p className="text-xs font-black text-white leading-tight italic truncate">{item.heading}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                 <button onClick={() => setIsGalleryOpen(false)} className="px-12 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Cerrar Galer&iacute;a</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification Cinematic */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="fixed bottom-10 right-10 z-[200] bg-andina-primary px-8 py-5 rounded-[2rem] flex items-center gap-4 text-white font-black shadow-[0_20px_50px_rgba(34,197,94,0.4)] border border-white/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-white/40 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-xl">
              <Check size={24} className="animate-bounce" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Sistema Sincronizado</span>
               <span className="text-sm tracking-tight italic">Publicidad Actualizada Correctamente</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
