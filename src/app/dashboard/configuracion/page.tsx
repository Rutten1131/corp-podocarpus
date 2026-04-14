"use client";

import { useModuleContext } from "@/context/module-context";
import { NAV_COOPERATIVA, NAV_SOCIO } from "@/lib/navigation";
import { motion } from "framer-motion";
import { Settings, Eye, EyeOff, Info } from "lucide-react";

export default function ConfiguracionPage() {
  const { visibility, toggleModule } = useModuleContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const modules = [...NAV_COOPERATIVA, ...NAV_SOCIO].filter(
    (item, index, self) => 
      item.href !== "/dashboard" && 
      item.href !== "/dashboard/configuracion" &&
      index === self.findIndex((t) => t.href === item.href)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-heading font-bold text-andina-text tracking-tight flex items-center gap-3">
          <Settings className="text-andina-primary" />
          Configuración de Módulos
        </h2>
        <p className="text-andina-text/50 font-mono text-xs uppercase tracking-wider mt-2">
          Control de visibilidad para presentaciones y exposiciones
        </p>
      </div>

      <div className="bg-andina-primary/10 border border-andina-primary/20 rounded-xl p-4 flex gap-4 items-start">
        <div className="p-2 bg-andina-primary/20 rounded-lg">
          <Info size={20} className="text-andina-primary" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-andina-text">Modo de Exposición</h4>
          <p className="text-xs text-andina-text/60 mt-1 leading-relaxed">
            Utiliza estos interruptores para ocultar o mostrar módulos específicos del CRM. Esto te permite presentar las funcionalidades paso a paso durante una demostración. Los cambios se guardan localmente en este navegador.
          </p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {modules.map((module) => {
          const isVisible = visibility[module.href] !== false;
          const Icon = module.icon;

          return (
            <motion.div
              key={module.href}
              variants={itemVariants}
              className={`p-5 rounded-2xl border transition-all duration-300 group
                ${isVisible 
                  ? "bg-andina-surface/40 border-andina-border hover:border-andina-primary/30" 
                  : "bg-andina-surface/10 border-andina-border/20 opacity-60"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors
                    ${isVisible ? "bg-andina-primary/10 text-andina-primary" : "bg-white/5 text-andina-text/40"}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-andina-text">{module.label}</h3>
                    <p className="text-[10px] font-mono text-andina-text/40 uppercase tracking-widest mt-0.5">
                      {module.href.split('/').pop()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleModule(module.href)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-andina-primary/50
                    ${isVisible ? "bg-andina-primary" : "bg-white/10"}`}
                >
                  <motion.div
                    animate={{ x: isVisible ? 26 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center"
                  >
                    {isVisible ? <Eye size={10} className="text-andina-primary" /> : <EyeOff size={10} className="text-andina-text/40" />}
                  </motion.div>
                </button>
              </div>
              
              <p className="mt-4 text-xs text-andina-text/50 leading-relaxed italic">
                {module.description || "Sin descripción disponible."}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="pt-8 border-t border-andina-border flex justify-between items-center text-andina-text/30 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span>Cooperativa Podocarpus • v1.0.4</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-andina-primary"></span> Activo</span>
          <span>Cifrado SSL</span>
        </div>
      </div>
    </div>
  );
}
