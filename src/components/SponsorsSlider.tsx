"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function SponsorsSlider() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadSponsors = () => {
      const saved = localStorage.getItem("podocarpus_sponsors");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setSponsors(parsed);
            return;
          }
        } catch (e) {
          console.error("Error parsing sponsors", e);
        }
      }
      
      // Defaults if nothing saved or error
      setSponsors([
        { name: "Reserva Natural Podocarpus", image: "https://i.pinimg.com/1200x/81/04/09/8104098f36e1a72a360f4e0ae1f6af85.jpg", link: "#" },
        { name: "Loja - Ciudad Castellana", image: "https://i.pinimg.com/1200x/22/e9/70/22e9707022c7f280eba0d32b9407eac0.jpg", link: "#" },
        { name: "Cultura y Tradición", image: "https://i.pinimg.com/736x/7a/66/a3/7a66a3d0f4c2a67a9f679d8fd9a9dc59.jpg", link: "#" },
        { name: "Belleza Andina", image: "https://i.pinimg.com/1200x/4d/49/c3/4d49c3d220f17f5229e85172a4176fdf.jpg", link: "#" }
      ]);
    };

    loadSponsors();
    window.addEventListener("storage", loadSponsors);
    return () => window.removeEventListener("storage", loadSponsors);
  }, []);

  useEffect(() => {
    if (sponsors.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sponsors.length]);

  const currentSponsor = sponsors[currentIndex];

  if (sponsors.length === 0) return null;

  return (
    <section className="py-24 bg-andina-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
        <div className="max-w-xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter uppercase mb-4 leading-none drop-shadow-lg"
          >
            NUESTROS <br />
            <span className="text-andina-primary">ALIADOS ESTRATÉGICOS</span>
          </motion.h2>
          <p className="text-sm font-mono text-andina-text/40 uppercase tracking-[0.3em]">Exposición Premium para Marcas de Autoridad</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex -space-x-3">
             {sponsors.slice(0, 4).map((s, i) => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-andina-bg overflow-hidden bg-white">
                 <img src={s.image} className="w-full h-full object-cover" alt="" />
               </div>
             ))}
           </div>
           <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap">Conectando Oportunidades</span>
        </div>
      </div>

      <div className="relative h-[500px] md:h-[600px] w-full max-w-[1400px] mx-auto px-6 group">
        <AnimatePresence mode="wait">
           {currentSponsor && (
             <motion.div
               key={currentIndex}
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.05, y: -20 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="absolute inset-0 px-6"
             >
               <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl">
                 {/* Dynamic Background */}
                 <div className="absolute inset-0">
                    <img 
                      src={currentSponsor.image} 
                      alt={currentSponsor.name} 
                      className="w-full h-full object-cover grayscale-[0.2] brightness-[0.3] group-hover:scale-105 group-hover:brightness-[0.4] transition-all duration-[2s]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-andina-bg via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-andina-bg/90 via-transparent to-transparent opacity-70" />
                 </div>

                 {/* Content Overlay */}
                 <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-2xl"
                    >
                      <div className="inline-block px-4 py-1.5 rounded-full bg-andina-primary/20 backdrop-blur-md border border-andina-primary/30 text-andina-primary text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-6">
                        Sponsor Autorizado
                      </div>
                      <h3 className="text-4xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter mb-6 leading-none drop-shadow-xl">
                        {currentSponsor.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row items-center gap-8">
                         <Link 
                            href={currentSponsor.link || "#"}
                            className="group/btn flex items-center gap-4 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-sm hover:bg-andina-primary hover:text-white transition-all shadow-2xl w-full sm:w-auto justify-center"
                         >
                            <span>Ver Beneficios</span>
                            <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                         </Link>
                         <div className="hidden md:flex flex-col">
                           <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Impulso Regional</p>
                           <div className="flex gap-1">
                             {sponsors.map((_, idx) => (
                               <div 
                                 key={idx} 
                                 className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-andina-primary' : 'w-2 bg-white/10'}`} 
                               />
                             ))}
                           </div>
                         </div>
                      </div>
                    </motion.div>
                 </div>

                 {/* Progress Bar (Timer) */}
                 <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                    <motion.div 
                      key={currentIndex + "-bar"}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-andina-primary origin-left"
                    />
                 </div>
               </div>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </section>
  );
}
