"use client";

import Link from "next/link";
import { ShieldCheck, KeyRound, Building2, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-andina-bg flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Dot Pattern & Glows */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-andina-text) 1px, transparent 0)', backgroundSize: '32px 32px' }} 
      />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-andina-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-andina-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 w-full max-w-4xl px-6 flex flex-col items-center"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-20 h-20 bg-andina-surface rounded-2xl shadow-2xl border border-andina-border flex items-center justify-center mb-8 relative glassmorphism group"
        >
          <span className="text-4xl font-heading font-black text-andina-primary drop-shadow-[0_0_15px_rgba(46,168,79,0.5)]">P</span>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-andina-bg flex items-center justify-center text-andina-primary border-2 border-andina-primary shadow-[0_0_10px_rgba(46,168,79,0.3)]">
            <KeyRound size={14} />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight mb-4 text-center">
          Acceso al Sistema
        </h1>
        <p className="text-andina-text/60 max-w-md text-center mb-12 font-mono text-sm leading-relaxed">
          Bienvenido a la plataforma de <span className="text-andina-accent">Cooperativa Podocarpus</span>. Seleccione su perfil para ingresar a su área de gestión.
        </p>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Perfil Gerencia */}
          <Link href="/dashboard?role=cooperativa" className="block">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-andina-surface/60 backdrop-blur-xl border border-andina-border hover:border-andina-primary px-8 py-10 rounded-3xl shadow-lg hover:shadow-[0_10px_40px_rgba(46,168,79,0.15)] transition-all duration-300 flex flex-col items-center text-center overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-1 bg-gradient-to-b from-andina-primary/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity z-0" />
              
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-andina-primary/20 flex items-center justify-center mb-6 border border-white/10 group-hover:border-andina-primary/50 transition-colors duration-300">
                 <Building2 size={32} className="text-andina-text/60 group-hover:text-andina-primary transition-colors drop-shadow-md" />
              </div>
              <h2 className="relative z-10 text-2xl font-bold font-heading text-white mb-3">
                Gerencia y Admin
              </h2>
              <p className="relative z-10 text-sm text-andina-text/50 group-hover:text-andina-text/80 transition-colors">
                Control de flota, contabilidad, reportes SEPS y padrón de socios.
              </p>
            </motion.div>
          </Link>

          {/* Perfil Socio */}
          <Link href="/dashboard?role=socio" className="block">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-andina-surface/60 backdrop-blur-xl border border-andina-border hover:border-[#C9A84C] px-8 py-10 rounded-3xl shadow-lg hover:shadow-[0_10px_40px_rgba(201,168,76,0.15)] transition-all duration-300 flex flex-col items-center text-center overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-1 bg-gradient-to-b from-andina-accent/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity z-0" />
              
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-andina-accent/20 flex items-center justify-center mb-6 border border-white/10 group-hover:border-andina-accent/50 transition-colors duration-300">
                 <UserCircle2 size={32} className="text-andina-text/60 group-hover:text-andina-accent transition-colors drop-shadow-md" />
              </div>
              <h2 className="relative z-10 text-2xl font-bold font-heading text-white mb-3">
                Socio Operador
              </h2>
              <p className="relative z-10 text-sm text-andina-text/50 group-hover:text-andina-text/80 transition-colors">
                Gestión de activo vehicular, mantenimiento y control de cobros.
              </p>
            </motion.div>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-xs font-mono text-andina-text/40 flex items-center gap-2 tracking-widest uppercase"
        >
           <ShieldCheck size={14} className="text-andina-primary" />
           Entorno seguro encriptado • Autoridad Andina v2.0
        </motion.div>
      </motion.div>
    </div>
  );
}
