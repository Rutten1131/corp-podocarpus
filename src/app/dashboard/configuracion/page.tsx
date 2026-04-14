"use client";

import { useModuleContext } from "@/context/module-context";
import { NAV_COOPERATIVA, NAV_SOCIO } from "@/lib/navigation";
import { motion, Variants } from "framer-motion";
import { Settings, Eye, EyeOff, Info, Bot, Phone, Globe, Link as LinkIcon, Key } from "lucide-react";

export default function ConfiguracionPage() {
  const { visibility, toggleModule, settings, updateSettings } = useModuleContext();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  const modules = [...NAV_COOPERATIVA, ...NAV_SOCIO].filter(
    (item, index, self) => 
      item.href !== "/dashboard" && 
      item.href !== "/dashboard/configuracion" &&
      index === self.findIndex((t) => t.href === item.href)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      {/* Header Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] uppercase">
            Sistema <span className="text-andina-primary">Maestro</span>
          </h1>
          <p className="text-andina-text/60 font-mono text-[10px] uppercase tracking-[0.3em] mt-3 font-bold flex items-center gap-2">
            <Settings size={12} className="text-andina-primary animate-spin-slow" /> Configuraci&oacute;n estratégica y control de n&uacute;cleo
          </p>
        </div>
        <div className="bg-andina-surface/40 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-3 flex items-center gap-4">
           <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Estado del Core</span>
             <span className="text-[10px] font-black text-andina-primary flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-andina-primary animate-pulse"></span> OPERATIVO
             </span>
           </div>
        </div>
      </div>

      {/* Info Banner Tactical */}
      <div className="bg-andina-primary/5 border border-andina-primary/20 rounded-[2rem] p-8 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
           <Info size={120} />
        </div>
        <div className="p-4 bg-andina-primary/10 rounded-2xl shadow-xl border border-andina-primary/20">
          <Info size={28} className="text-andina-primary" />
        </div>
        <div className="relative z-10">
          <h4 className="text-lg font-black text-white tracking-tight italic">Consola de Exposici&oacute;n Din&aacute;mica</h4>
          <p className="text-sm text-andina-text/60 mt-2 leading-relaxed max-w-2xl font-medium">
            Active o silencie m&oacute;dulos espec&iacute;ficos para presentaciones tecnol&oacute;gicas. Este control permite una narrativa progresiva de las funcionalidades del CRM, optimizando la experiencia del usuario final.
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-andina-text/30 font-mono uppercase tracking-[0.4em] px-2 italic">Mapeo de Funcionalidades</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {modules.map((module) => {
            const isVisible = visibility[module.href] !== false;
            const Icon = module.icon;

            return (
              <motion.div
                key={module.href}
                variants={itemVariants}
                className={`p-6 rounded-[2.5rem] border-2 transition-all duration-500 group relative overflow-hidden
                  ${isVisible 
                    ? "bg-andina-surface/40 border-white/5 shadow-2xl hover:border-andina-primary/40 shadow-[0_20px_40px_rgba(0,0,0,0.3)]" 
                    : "bg-black/20 border-white/5 opacity-40 grayscale"}`}
              >
                {isVisible && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-andina-primary/5 blur-3xl rounded-full -mr-10 -mt-10"></div>
                )}
                
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl
                      ${isVisible ? "bg-andina-primary text-white scale-110 shadow-andina-primary/20 shadow-[0_10px_20px_rgba(34,197,94,0.3)]" : "bg-white/5 text-white/20"}`}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg tracking-tight italic leading-tight">{module.label}</h3>
                      <p className="text-[9px] font-black font-mono text-andina-text/30 uppercase tracking-[0.2em] mt-1">
                        NODE_{module.href.split('/').pop()?.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleModule(module.href)}
                    className={`relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none group/toggle shadow-inner
                      ${isVisible ? "bg-andina-primary/40" : "bg-white/5 blur-[1px]"}`}
                  >
                    <motion.div
                      animate={{ x: isVisible ? 30 : 4 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`absolute top-1 left-0 w-5 h-5 rounded-full shadow-2xl flex items-center justify-center transition-colors
                        ${isVisible ? "bg-white" : "bg-white/20"}`}
                    >
                      {isVisible ? <Eye size={12} className="text-andina-primary" /> : <EyeOff size={12} className="text-white/40" />}
                    </motion.div>
                  </button>
                </div>
                
                <p className="mt-6 text-[11px] text-andina-text/40 leading-relaxed font-medium italic relative z-10">
                  {module.description || "Sistema operativo sin descripci&oacute;n detallada."}
                </p>

                {isVisible && (
                  <div className="mt-4 flex gap-1 relative z-10">
                    <div className="h-0.5 flex-1 bg-andina-primary/20 rounded-full overflow-hidden">
                       <div className="h-full bg-andina-primary w-full animate-progress-slow"></div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* AI Assistant & Notifications Settings Cinematic */}
      <div className="pt-20 border-t border-white/5">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 rounded-2xl bg-andina-accent/10 border border-andina-accent/20 flex items-center justify-center text-andina-accent shadow-[0_0_15px_rgba(201,168,76,0.2)]">
              <Bot size={28} />
           </div>
           <div>
              <h2 className="text-3xl font-black text-white tracking-tighter italic">N&uacute;cleo de Inteligencia</h2>
              <p className="text-[10px] font-black text-andina-text/40 uppercase tracking-[0.4em] font-mono mt-1">Gesti&oacute;n de protocolos y comunicaciones AI</p>
           </div>
        </div>
        
        <div className="space-y-10 bg-andina-surface/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] shadow-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
             <Bot size={300} />
          </div>

          {/* AI Toggle Tactical */}
          <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-black/40 border border-white/5 rounded-[2rem] shadow-inner gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className={`p-5 rounded-2xl transition-all duration-500 shadow-2xl
                 ${settings.aiEnabled ? "bg-andina-accent text-white shadow-andina-accent/20" : "bg-white/5 text-white/20"}`}>
                <Bot size={32} className={settings.aiEnabled ? "animate-pulse" : ""} />
              </div>
              <div>
                <h4 className="font-black text-white text-xl tracking-tight italic leading-tight">Agente Virtual Autónomo</h4>
                <p className="text-sm text-andina-text/40 font-medium mt-1">Inyecci&oacute;n de IA en el portal del socio y canales externos</p>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ aiEnabled: !settings.aiEnabled })}
              className={`relative w-16 h-8 rounded-full transition-all duration-500 focus:outline-none shadow-2xl
                ${settings.aiEnabled ? "bg-andina-accent/40" : "bg-white/5"}`}
            >
              <motion.div
                animate={{ x: settings.aiEnabled ? 36 : 4 }}
                className={`absolute top-1 left-0 w-6 h-6 rounded-full shadow-xl transition-colors
                  ${settings.aiEnabled ? "bg-white" : "bg-white/10"}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            <div className="space-y-4">
              <label className="text-[9px] font-black font-mono uppercase tracking-[0.3em] text-andina-text/30 px-2">Canal de Notificaci&oacute;n (WhatsApp)</label>
              <div className="relative group/field">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-andina-text/20 group-focus-within/field:text-andina-primary transition-all scale-110" size={20} />
                <input 
                  type="text" 
                  value={settings.notificationNumbers}
                  onChange={(e) => updateSettings({ notificationNumbers: e.target.value })}
                  placeholder="593..."
                  className="w-full bg-black/60 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm text-white font-black placeholder:text-white/5 focus:border-andina-primary/40 focus:bg-black/80 outline-none transition-all shadow-inner tracking-widest"
                />
              </div>
              <p className="text-[10px] text-andina-text/20 font-bold px-2 italic">Separaci&oacute;n m&uacute;ltiple mediante coma universal.</p>
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-black font-mono uppercase tracking-[0.3em] text-andina-text/30 px-2">Instancia de Transmisi&oacute;n</label>
              <div className="relative group/field">
                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-andina-text/20 group-focus-within/field:text-andina-primary transition-all scale-110" size={20} />
                <input 
                  type="text" 
                  value={settings.evolutionInstance}
                  onChange={(e) => updateSettings({ evolutionInstance: e.target.value })}
                  placeholder="ID_INSTANCE_01"
                  className="w-full bg-black/60 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm text-white font-black placeholder:text-white/5 focus:border-andina-primary/40 focus:bg-black/80 outline-none transition-all shadow-inner uppercase tracking-tighter"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            <div className="space-y-4">
              <label className="text-[9px] font-black font-mono uppercase tracking-[0.3em] text-andina-text/30 px-2">Endpoint de API Global</label>
              <div className="relative group/field">
                <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-andina-text/20 group-focus-within/field:text-andina-primary transition-all scale-110" size={20} />
                <input 
                  type="text" 
                  value={settings.evolutionApiUrl}
                  onChange={(e) => updateSettings({ evolutionApiUrl: e.target.value })}
                  placeholder="https://core.transmision.com"
                  className="w-full bg-black/60 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-xs text-andina-primary font-bold placeholder:text-white/5 focus:border-andina-primary/40 focus:bg-black/80 outline-none transition-all shadow-inner font-mono"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-black font-mono uppercase tracking-[0.3em] text-andina-text/30 px-2">Master Authentication Key</label>
              <div className="relative group/field">
                <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-andina-text/20 group-focus-within/field:text-andina-primary transition-all scale-110" size={20} />
                <input 
                  type="password" 
                  value={settings.evolutionApiKey}
                  onChange={(e) => updateSettings({ evolutionApiKey: e.target.value })}
                  placeholder="••••••••••••••••••••"
                  className="w-full bg-black/60 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm text-andina-primary font-black focus:border-andina-primary/40 focus:bg-black/80 outline-none transition-all shadow-inner tracking-[0.5em]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between px-2">
               <label className="text-[9px] font-black font-mono uppercase tracking-[0.3em] text-andina-text/30">Protocolo de Bienvenida</label>
               <span className="text-[8px] font-black text-andina-accent uppercase tracking-widest animate-pulse">Neural Prompt Active</span>
            </div>
            <textarea 
              value={settings.welcomeMessage}
              onChange={(e) => updateSettings({ welcomeMessage: e.target.value })}
              className="w-full bg-black/60 border border-white/5 rounded-[2rem] py-8 px-8 text-sm text-white font-medium leading-relaxed placeholder:text-white/5 focus:border-andina-primary/40 focus:bg-black/80 outline-none transition-all min-h-[160px] shadow-inner resize-none italic"
              placeholder="Escriba el prompt maestro de bienvenida..."
            />
          </div>
        </div>
      </div>

      {/* Footer Branding Tactical */}
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-andina-text/20 font-mono text-[10px] font-black uppercase tracking-[0.4em] italic text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
           <span className="text-white/40">CORE_SYSTEM_PODOCARPUS</span>
           <span className="hidden md:block text-white/5">•</span>
           <span>VERSION_STABLE_1.0.4</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <span className="flex items-center gap-2 group cursor-help transition-colors hover:text-andina-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-andina-primary shadow-[0_0_8px_rgba(34,197,94,1)] animate-pulse"></span> 
            ENCRYPTION_ACTIVE
          </span>
          <span className="group cursor-help transition-colors hover:text-white/40">SECURED_BY_ANDINA_GUARD</span>
        </div>
      </div>
    </div>
  );
}
