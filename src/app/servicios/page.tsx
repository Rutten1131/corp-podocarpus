"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Bus, Map, ShieldCheck, CheckCircle2, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export default function ServiciosPage() {
  return (
    <div className="bg-andina-bg min-h-screen text-white font-sans">
      <Navbar />

      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-andina-primary/5 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-heading font-black tracking-tighter mb-6"
            >
              Servicios de <span className="text-andina-primary">Confianza Mapeada</span>
            </motion.h1>
            <p className="text-andina-text/60 text-lg leading-relaxed font-mono uppercase tracking-wider text-sm">
              No solo movemos personas, brindamos seguridad auditada y rastreo satelital en tiempo real.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transporte Escolar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group p-10 rounded-[2rem] bg-andina-surface/40 backdrop-blur-xl border border-andina-border hover:border-andina-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-andina-primary/10 rounded-2xl flex items-center justify-center text-andina-primary mb-8 border border-andina-primary/20">
                  <Bus size={32} />
                </div>
                <h3 className="text-3xl font-heading font-bold mb-4">Transporte Escolar</h3>
                <p className="text-andina-text/50 leading-relaxed mb-8">
                  Especializados en el cuidado de lo más valioso: sus hijos. Unidades con tecnología de punta para que los padres tengan paz mental absoluta.
                </p>
                <ul className="space-y-4">
                  {[
                    "Notificación de llegada vía App",
                    "Conductores con licencia profesional certificada",
                    "Cámaras de seguridad internas",
                    "Rutas optimizadas digitalmente"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-andina-text/80">
                      <CheckCircle2 size={18} className="text-andina-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contacto" className="mt-12 inline-flex items-center gap-2 font-bold text-andina-primary group-hover:gap-4 transition-all">
                Contratar para mi institución <ChevronRight size={20} />
              </Link>
            </motion.div>

            {/* Transporte Institucional */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group p-10 rounded-[2rem] bg-andina-surface/40 backdrop-blur-xl border border-andina-border hover:border-andina-accent/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-andina-accent/10 rounded-2xl flex items-center justify-center text-andina-accent mb-8 border border-andina-accent/20">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-3xl font-heading font-bold mb-4">Servicio Institucional</h3>
                <p className="text-andina-text/50 leading-relaxed mb-8">
                  Soluciones de movilidad para el personal de empresas públicas y privadas en Loja. Puntualidad y prestigio en cada kilómetro.
                </p>
                <ul className="space-y-4">
                  {[
                    "Control de asistencia automatizado",
                    "Seguro de pasajeros (SOAT obligatorio)",
                    "Confort premium en todas las unidades",
                    "Plataforma de gestión para RRHH"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-andina-text/80">
                      <CheckCircle2 size={18} className="text-andina-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contacto" className="mt-12 inline-flex items-center gap-2 font-bold text-andina-accent group-hover:gap-4 transition-all">
                Solicitar convenio corporativo <ChevronRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discovery Module: Validar Unidad */}
      <section className="py-24 bg-andina-surface/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-heading font-black mb-6 leading-tight">
                Plus Podocarpus: <br />
                <span className="text-andina-primary">Validación Digital Inmediata</span>
              </h2>
              <p className="text-andina-text/60 mb-8 leading-relaxed">
                Nuestra plataforma permite a cualquier cliente verificar la legalidad de la unidad que está abordando. Simplemente escaneando el QR o ingresando la placa, usted puede ver el estado del SOAT y el historial del conductor.
              </p>
              
              <div className="bg-andina-bg p-2 rounded-2xl border border-andina-border flex items-center shadow-2xl max-w-md">
                <input 
                  type="text" 
                  placeholder="Ingrese número de placa..." 
                  className="bg-transparent border-none focus:ring-0 flex-1 px-4 text-white font-mono"
                />
                <button className="bg-andina-primary p-4 rounded-xl text-white hover:bg-andina-primary/90 transition-colors">
                  <Search size={22} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="aspect-video bg-andina-bg rounded-3xl border border-andina-border shadow-2xl flex items-center justify-center relative overflow-hidden">
                {/* SVG Tracking animation */}
                <div className="absolute inset-0 bg-andina-surface/20 opacity-40 bg-[url('https://maps.wikimedia.org/osm-intl/14/4514/8468.png')] bg-cover" />
                <div className="relative z-10 p-8 bg-andina-bg/90 backdrop-blur rounded-2xl border border-andina-border flex items-center gap-6">
                   <div className="w-12 h-12 bg-andina-primary/20 rounded-full flex items-center justify-center text-andina-primary animate-ping">
                      <Map size={24} />
                   </div>
                   <div>
                      <p className="text-xs font-mono text-andina-text/40 uppercase tracking-widest">Tracking Activo</p>
                      <p className="font-bold text-white">Unidad 24 • Camino a San Gerardo</p>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-andina-primary rounded-full blur-[80px] opacity-20" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
