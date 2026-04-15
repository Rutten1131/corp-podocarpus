"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap, Share2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SponsorsSlider } from "@/components/SponsorsSlider";


const DEFAULT_AD = {
  heading: "LOJA AL SIGUIENTE NIVEL",
  subheading: "Tu seguridad es nuestra mayor inversión. 74 busetas listas para llevarte a tu destino con tecnología de punta.",
  cta: "Viaja con Nosotros",
  link: "/contacto",
  mediaUrl: "/hero-buseta.png"
};

export default function PromocionesPage() {
  const [ad, setAd] = useState(DEFAULT_AD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncAd = () => {
      const saved = localStorage.getItem("podocarpus_active_ad");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            setAd(prev => ({ ...prev, ...parsed }));
          }
        } catch (e) {
          console.error("Error syncing ad", e);
        }
      }
      setLoading(false);
    };

    syncAd();

    // Escuchar cambios en otras pestañas
    window.addEventListener("storage", syncAd);
    return () => window.removeEventListener("storage", syncAd);
  }, []);

  if (loading) return <div className="min-h-screen bg-andina-bg" />;
  
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <main className="min-h-screen bg-andina-bg font-sans selection:bg-andina-primary/30">
      <Navbar />
      
      {/* Dynamic Billboard Section */}
      <section className="relative h-screen min-h-[600px] md:min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-andina-bg via-andina-bg/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-andina-bg/80 via-transparent to-andina-bg/80 z-10" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={ad.mediaUrl}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              {ad?.mediaUrl ? (
                ad.mediaUrl.includes('youtube.com') || ad.mediaUrl.includes('youtu.be') ? (
                  <div className="w-full h-full pointer-events-none scale-150">
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYouTubeId(ad.mediaUrl)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${getYouTubeId(ad.mediaUrl)}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                ) : ad.mediaUrl.endsWith('.mp4') ? (
                  <video 
                    src={ad.mediaUrl} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={ad.mediaUrl} 
                    alt="Billboard Ad"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full bg-andina-bg" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-4xl text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-andina-primary/20 border border-andina-primary/30 text-andina-primary text-[10px] font-mono uppercase tracking-[0.2em] mb-6"
            >
              <Zap size={12} className="animate-pulse" />
              Campaña Activa • Podocarpus
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={ad?.heading || "default"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-8xl font-heading font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-4xl drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                  {ad?.heading || "Cargando..."}
                </h1>

                <p className="text-lg md:text-2xl text-andina-text/90 leading-relaxed mb-12 max-w-2xl font-light mx-auto md:mx-0 drop-shadow-lg">
                  {ad?.subheading || ""}
                </p>

                <div className="flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start">
                  <Link 
                    href={ad?.link || "/contacto"}
                    className="group relative flex items-center justify-center gap-4 bg-andina-primary hover:bg-andina-primary/90 px-8 py-5 rounded-2xl text-lg font-bold text-white transition-all shadow-[0_0_40px_rgba(46,168,79,0.3)] w-full sm:w-auto"
                  >
                    <span>{ad?.cta || "Ver más"}</span>
                    <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition-all font-bold backdrop-blur-md w-full sm:w-auto">
                    <Share2 size={20} />
                    Compartir Promo
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" 
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(230,237,243,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
        />
      </section>

      {/* Cinematic Sponsors Slider */}
      <SponsorsSlider />


      <Footer />
    </main>
  );
}
