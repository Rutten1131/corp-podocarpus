"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Save, MessageSquare, Mic } from "lucide-react";

export default function ContactoPage() {
  return (
    <div className="bg-andina-bg min-h-screen text-white font-sans">
      <Navbar />

      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-andina-primary/5 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-6"
          >
            Contacto de <span className="text-andina-primary">Emergencia Inteligente</span>
          </motion.h1>
          <p className="text-andina-text/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Respuesta inmediata. Nuestra IA gestiona sus reportes y emergencias transcribiendo audios de WhatsApp para una atención en segundos.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form or Visuals */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-andina-surface/30 p-10 rounded-[2.5rem] border border-andina-border flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold mb-8">Póngase en la agenda del éxito</h3>
                <p className="text-andina-text/50 mb-10 text-sm font-mono uppercase tracking-[0.2em]">Sincronice la seguridad con un clic</p>
                
                <div className="space-y-6 mb-12">
                   <div className="flex items-center gap-6 p-6 bg-andina-bg/50 rounded-2xl border border-white/5 group hover:border-andina-primary transition-colors">
                      <div className="w-12 h-12 bg-andina-primary/10 rounded-xl flex items-center justify-center text-andina-primary group-hover:bg-andina-primary group-hover:text-white transition-all">
                         <Phone size={24} />
                      </div>
                      <div>
                         <p className="text-xs text-andina-text/30 font-mono">Línea Directa</p>
                         <p className="text-lg font-bold">+593 7 2XXXXXX</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6 p-6 bg-andina-bg/50 rounded-2xl border border-white/5 group hover:border-andina-primary transition-colors">
                      <div className="w-12 h-12 bg-andina-primary/10 rounded-xl flex items-center justify-center text-andina-primary group-hover:bg-andina-primary group-hover:text-white transition-all">
                         <MessageSquare size={24} />
                      </div>
                      <div>
                         <p className="text-xs text-andina-text/30 font-mono">WhatsApp IA Asistente</p>
                         <p className="text-lg font-bold">Enviar Reporte / Audio</p>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-andina-primary/5 rounded-[2rem] border border-andina-primary/20 text-center">
                   <p className="text-sm text-andina-text/60 mb-6">Descargue nuestra tarjeta de contacto digital y aparezca primero en sus búsquedas como "Busetas" o "Transporte".</p>
                   <button className="w-full bg-andina-primary text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]">
                      <Save size={18} />
                      Guardar Contacto en el Celular
                   </button>
                </div>
              </div>
            </motion.div>

            {/* Visual/Image on right */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-andina-surface/40 rounded-[2.5rem] border border-andina-border p-10 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity">
                <Mic size={200} className="text-andina-primary" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-block px-3 py-1 bg-andina-accent/10 border border-andina-accent/30 rounded-full mb-6">
                    <span className="text-[10px] uppercase font-mono text-andina-accent">Voice-to-Text Powered</span>
                  </div>
                  <h3 className="text-3xl font-heading font-black mb-6">Asistencia de Voz Inmediata</h3>
                  <p className="text-andina-text/60 leading-relaxed max-w-sm">
                    Nuestro Call Center inteligente procesa sus requerimientos mediante procesamiento de lenguaje natural en tiempo real. Máxima rapidez ante eventos imprevistos.
                  </p>
                </div>

                <div className="mt-20">
                    <div className="flex items-start gap-4 mb-4">
                        <MapPin className="text-andina-primary mt-1" />
                        <div>
                            <p className="font-bold text-white uppercase text-xs tracking-widest font-mono">Sede Central</p>
                            <p className="text-sm text-andina-text/50">Av. XXX y Calle XXX, Loja, Ecuador</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Mail className="text-andina-primary mt-1" />
                        <div>
                            <p className="font-bold text-white uppercase text-xs tracking-widest font-mono">Email Corporativo</p>
                            <p className="text-sm text-andina-text/50">info@podocarpus.com</p>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
