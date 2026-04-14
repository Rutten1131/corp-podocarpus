"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ChevronRight, Shield, Award, Users, ArrowUpRight, Zap, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-andina-bg font-sans selection:bg-andina-primary/30 overflow-x-hidden">
      <Navbar />
      
      {/* Monumental Hero Section: Autoridad Andina */}
      <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-andina-bg via-andina-bg/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-andina-bg via-transparent to-andina-bg z-10" />
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full bg-[url('/hero-buseta.png')] bg-cover bg-center grayscale contrast-125"
          />
        </div>

        {/* Floating Particles/Grid */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" 
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(46,168,79,0.2) 1px, transparent 0)`, backgroundSize: '60px 60px' }} 
        />

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-andina-surface/80 backdrop-blur-xl border border-andina-border mb-8 shadow-2xl"
          >
            <div className="flex -space-x-2">
               {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-andina-surface bg-andina-primary" />)}
            </div>
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">Más de 74 Socios Activos</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-6xl md:text-9xl font-heading font-black text-white leading-[0.9] tracking-tighter mb-8"
            >
              LA FLOTA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-andina-primary via-white to-andina-accent text-7xl md:text-8xl">MÁS GRANDE.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-andina-text/60 leading-relaxed mb-12 max-w-2xl font-sans font-light"
            >
              Al servicio de Loja, brindando seguridad, puntualidad y tecnología en cada ruta. Somos la fuerza de transporte más confiable de la región.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link 
                href="/contacto"
                className="group relative flex items-center justify-center gap-4 bg-andina-primary hover:bg-andina-primary/90 px-10 py-5 rounded-2xl text-lg font-bold text-white transition-all shadow-[0_0_40px_rgba(46,168,79,0.3)]"
              >
                <span>Cotiza tu Ruta</span>
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a 
                href="https://www.facebook.com/share/p/178W1kZ95w/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 px-10 py-5 rounded-2xl text-lg font-bold text-white transition-all border border-white/10 backdrop-blur-xl"
              >
                <span>Nuestro Nuevo Post</span>
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Side Badge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block z-20">
           <div className="p-10 border-l border-white/5 bg-andina-surface/40 backdrop-blur-2xl rounded-l-3xl space-y-8">
              {[
                { label: "Seguridad", val: "ANT 2026", icon: Shield },
                { label: "Unidades", val: "74 BUSES", icon: Zap },
                { label: "Cobertura", val: "TODO LOJA", icon: MapPin }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-andina-primary/10 flex items-center justify-center text-andina-primary border border-andina-primary/30">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-andina-text/40 font-mono uppercase tracking-widest leading-none mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-white uppercase">{item.val}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Monetization / Advertising Banner */}
      <section className="relative z-30 -mt-12 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-andina-surface/60 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-andina-primary">
               <Zap size={32} />
            </div>
            <div>
              <p className="text-[10px] font-mono text-andina-primary uppercase tracking-[0.3em] font-bold mb-1">Espacio de Monetización</p>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">Socio Estratégico del Mes: ServiLoja</h4>
            </div>
          </div>
          <p className="text-sm text-andina-text/40 max-w-md text-center md:text-left">
            Impulsa tu marca ante miles de usuarios diarios. Este banner genera ingresos directos para el Fondo de Mantenimiento de la flota.
          </p>
          <Link href="/promociones" className="bg-white/5 hover:bg-white/10 px-8 py-3 rounded-xl border border-white/10 text-xs font-bold text-white transition-all whitespace-nowrap">
            Ver Convenios
          </Link>
        </motion.div>
      </section>

      {/* Trust & Magnitude Section */}
      <section className="py-32 bg-andina-surface relative border-y border-andina-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Infraestructura Masiva", 
                desc: "No somos solo una cooperativa, somos un ecosistema de movilidad con 74 socios comprometidos.",
                icon: Users
              },
              { 
                title: "Tecnología de Punta", 
                desc: "Seguimiento GPS satelital y central de emergencias 24/7 integrada con IA.",
                icon: Zap
              },
              { 
                title: "Autoridad Institucional", 
                desc: "Certificados por todos los entes reguladores para transporte escolar e institucional.",
                icon: Award
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-3xl bg-andina-bg border border-andina-border hover:border-andina-primary/30 transition-all group"
              >
                <div className="w-16 h-16 bg-andina-surface rounded-2xl flex items-center justify-center mb-8 border border-andina-border group-hover:bg-andina-primary/10 group-hover:text-andina-primary transition-all">
                  <card.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-andina-text/50 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
