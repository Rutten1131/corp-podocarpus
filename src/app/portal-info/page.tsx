"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart3, Database, HardDrive, ShieldCheck, Activity, Brain } from "lucide-react";
import Link from "next/link";

export default function PortalInfoPage() {
  return (
    <div className="bg-andina-bg min-h-screen text-white font-sans">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-andina-primary/5 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-heading font-black tracking-tighter mb-6 drop-shadow-xl"
          >
            Gerencia de <span className="text-andina-primary">Activos VIP</span>
          </motion.h1>
          <p className="text-andina-text/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            No somos dueños de busetas, somos gerentes de empresas individuales. El Portal del Socio es el blindaje definitivo para su patrimonio.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-10 rounded-3xl bg-andina-surface/40 border border-andina-border flex flex-col items-center text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-andina-primary/10 rounded-2xl flex items-center justify-center text-andina-primary mb-8 border border-andina-primary/20">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Blindaje Patrimonial</h3>
              <p className="text-sm text-andina-text/70 leading-relaxed font-mono uppercase tracking-widest font-bold">
                Control estricto de cobranzas y aportaciones. Aseguramos que su liquidez esté siempre resguardada.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-10 rounded-3xl bg-andina-surface/40 border border-andina-border flex flex-col items-center text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-andina-accent/10 rounded-2xl flex items-center justify-center text-andina-accent mb-8 border border-andina-accent/20">
                <Brain size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Analítica Predictiva</h3>
              <p className="text-sm text-andina-text/70 leading-relaxed font-mono uppercase tracking-widest font-bold">
                Anticípese a los fallos mecánicos. El sistema le avisa cuándo invertir en mantenimiento preventivo.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 md:p-10 rounded-3xl bg-andina-surface/40 border border-andina-border flex flex-col items-center text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-andina-text/60 mb-8 border border-white/5">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Métricas al Instante</h3>
              <p className="text-sm text-andina-text/70 leading-relaxed font-mono uppercase tracking-widest font-bold">
                Visualice ingresos, ocupación de ruta y rentabilidad neta desde su celular en tiempo real.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Module */}
      <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-andina-surface to-andina-bg rounded-[3rem] border border-white/5 p-8 md:p-12 overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 p-20 opacity-10">
                    <Database size={200} className="text-andina-primary" />
                </div>
                
                <div className="max-w-2xl relative z-10 w-full text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight drop-shadow-lg">La oficina del futuro, <br />hoy en su bolsillo.</h2>
                    <ul className="space-y-6 mb-12 inline-block md:block">
                        <li className="flex gap-4 text-left">
                            <div className="w-6 h-6 rounded-full bg-andina-primary/20 flex items-center justify-center shrink-0">
                                <Activity size={14} className="text-andina-primary" />
                            </div>
                            <p className="text-andina-text/90 font-medium">Historial mecánico digital para cada buseta.</p>
                        </li>
                        <li className="flex gap-4 text-left">
                            <div className="w-6 h-6 rounded-full bg-andina-primary/20 flex items-center justify-center shrink-0">
                                <Activity size={14} className="text-andina-primary" />
                            </div>
                            <p className="text-andina-text/90 font-medium">Reportes financieros listos para la SEPS.</p>
                        </li>
                        <li className="flex gap-4 text-left">
                            <div className="w-6 h-6 rounded-full bg-andina-primary/20 flex items-center justify-center shrink-0">
                                <Activity size={14} className="text-andina-primary" />
                            </div>
                            <p className="text-andina-text/90 font-medium">E-learning: Capacitación continua de conductores.</p>
                        </li>
                    </ul>
                    <Link href="/login" className="inline-block bg-white text-andina-bg px-8 py-5 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-andina-primary hover:text-white transition-all shadow-xl w-full sm:w-auto">
                        Ingresar a mi Consola
                    </Link>
                </div>
            </div>
          </div>
      </section>

      <Footer />
    </div>
  );
}
