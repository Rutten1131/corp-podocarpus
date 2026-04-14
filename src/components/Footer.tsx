"use client";

import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { PodocarpusLogo } from "./PodocarpusLogo";

// Inline Social Icons to avoid missing dependencies in local lucide-react version
const FacebookIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);


export function Footer() {
  return (
    <footer className="bg-andina-bg border-t border-andina-border pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-andina-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-4">
              <PodocarpusLogo size="md" />
              <span className="text-xl font-heading font-black text-white tracking-tighter uppercase">
                Podocarpus
              </span>
            </Link>
            <p className="text-andina-text/80 text-sm leading-relaxed max-w-xs font-medium">
              Liderazgo en movilidad segura en el sur del Ecuador. La flota más grande de Loja con 74 unidades al servicio de su tranquilidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-andina-primary hover:text-white transition-all border border-white/5"><FacebookIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-andina-primary hover:text-white transition-all border border-white/5"><InstagramIcon size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-tighter mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm font-mono uppercase tracking-wider font-bold">
              <li><Link href="/" className="text-andina-text/60 hover:text-andina-primary transition-colors">Inicio</Link></li>
              <li><Link href="/servicios" className="text-andina-text/60 hover:text-andina-primary transition-colors">Servicios</Link></li>
              <li><Link href="/promociones" className="text-andina-text/60 hover:text-andina-primary transition-colors">Promociones</Link></li>
              <li><Link href="/contacto" className="text-andina-text/60 hover:text-andina-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-tighter mb-6">Soporte</h4>
            <ul className="space-y-4 text-sm font-mono uppercase tracking-wider font-bold">
              <li><Link href="/portal-info" className="text-andina-text/60 hover:text-andina-primary transition-colors">Portal Socio</Link></li>
              <li><a href="#" className="text-andina-text/60 hover:text-andina-primary transition-colors">Términos Legales</a></li>
              <li><a href="#" className="text-andina-text/60 hover:text-andina-primary transition-colors">Seguridad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-tighter mb-6">Contacto Directo</h4>
            <ul className="space-y-4 text-sm text-andina-text/80 font-medium">
              <li className="flex gap-3 items-center"><MapPin size={18} className="text-andina-primary" /> Loja, Ecuador</li>
              <li className="flex gap-3 items-center"><Phone size={18} className="text-andina-primary" /> +593 7 2XXXXXX</li>
              <li className="flex gap-3 items-center"><Mail size={18} className="text-andina-primary" /> gerencia@podocarpus.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-andina-text/50 font-mono tracking-widest uppercase font-bold text-center md:text-left">
            © 2026 Cooperativa de Transportes Podocarpus. Autoridad Andina.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-andina-text/60 font-mono uppercase tracking-tighter font-black bg-white/5 px-4 py-2 rounded-full border border-white/5 shadow-2xl">
            <ShieldCheck size={14} className="text-andina-primary" />
            Certificado de Seguridad ANT 2026
          </div>
        </div>
      </div>

      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-andina-primary/5 rounded-full blur-[100px]" />
    </footer>
  );
}
