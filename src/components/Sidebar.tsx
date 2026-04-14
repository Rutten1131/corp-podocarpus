"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  DollarSign,
  MapPin,
  Route,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Landmark,
  Megaphone,
  Monitor,
  Banknote,
  TrendingUp
} from "lucide-react";
import { PodocarpusLogo } from "./PodocarpusLogo";

import { NAV_COOPERATIVA, NAV_SOCIO } from "@/lib/navigation";
import { useModuleContext } from "@/context/module-context";

type ProfileType = "cooperativa" | "socio";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileType>("cooperativa");
  return { profile, setProfile };
};

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { isMobileOpen, setIsMobileOpen, isModuleVisible } = useModuleContext();
  
  const [profile, setProfile] = useState<ProfileType>("cooperativa");
  const searchParams = useSearchParams();

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "socio") {
      setProfile("socio");
    } else if (role === "cooperativa") {
      setProfile("cooperativa");
    }
    // Close mobile menu on role change or any navigation
    setIsMobileOpen(false);
  }, [searchParams, pathname, setIsMobileOpen]);

  const navItems = (profile === "cooperativa" ? NAV_COOPERATIVA : NAV_SOCIO).filter(item => 
    item.href === "/dashboard" || item.href === "/dashboard/configuracion" || isModuleVisible(item.href)
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen bg-andina-surface border-r border-andina-border flex flex-col transition-all duration-300 ${
          isMobileOpen ? "translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.5)]" : "-translate-x-full lg:translate-x-0"
        } ${
          collapsed ? "lg:w-[72px]" : "lg:w-[260px]"
        } w-[280px]`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-andina-border bg-andina-bg/20">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <PodocarpusLogo size="sm" />
            {(!collapsed || isMobileOpen) && (
              <div className="overflow-hidden">
                <h1 className="text-sm font-heading font-black tracking-tight text-white uppercase truncate">Podocarpus</h1>
                <p className="text-[9px] text-andina-primary font-mono uppercase tracking-widest font-black">Autoridad Andina</p>
              </div>
            )}
          </Link>
          <button className="lg:hidden p-2 text-andina-text/60 hover:text-white" onClick={() => setIsMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {(!collapsed || isMobileOpen) && (
             <p className="px-5 text-[10px] text-andina-text/60 font-black font-mono uppercase tracking-[0.2em] mb-4">
                {profile === "cooperativa" ? "Centro de Gestión" : "Operativa Socio"}
             </p>
          )}
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-3.5 text-sm transition-all duration-300 group ${
                  isActive
                    ? "text-andina-primary bg-andina-primary/10 font-black shadow-[inset_4px_0_0_0_#2ea84f]"
                    : "text-andina-text/80 hover:text-white hover:bg-white/5 font-semibold"
                }`}
              >
                <Icon
                  size={20}
                  className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-andina-primary" : "text-andina-text/60 group-hover:text-andina-primary"}`}
                />
                {(!collapsed || isMobileOpen) && (
                  <span className="truncate tracking-tight">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-andina-primary shadow-[0_0_10px_#2ea84f]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-andina-border bg-andina-bg/10">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full py-2.5 rounded-xl text-andina-text/60 hover:text-white hover:bg-andina-primary/10 transition-all border border-transparent hover:border-andina-primary/20"
          >
            {collapsed ? <ChevronRight size={18} /> : (
              <div className="flex items-center gap-2">
                <ChevronLeft size={18} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Contraer Menú</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export function TopBar() {
  const { setIsMobileOpen } = useModuleContext();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "cooperativa";

  return (
    <header className="sticky top-0 z-40 h-16 bg-andina-bg/80 backdrop-blur-2xl border-b border-andina-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Toggle + Branding */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2.5 text-andina-text/60 hover:text-white hover:bg-white/5 rounded-xl active:scale-95 transition-all border border-transparent hover:border-white/10"
          >
            <Menu size={26} />
          </button>
          <div className="flex items-center gap-3">
            <PodocarpusLogo size="sm" />
            <div className="flex flex-col justify-center">
              <span className="text-xs font-black text-white uppercase tracking-tighter leading-none">
                Podocarpus
              </span>
              <span className="text-andina-primary font-mono tracking-[0.2em] text-[8px] font-black uppercase mt-0.5">
                {role === "socio" ? "Operativa Socio" : "Gestión Gerencial"}
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-xs group hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-andina-text/40 group-focus-within:text-andina-primary transition-colors" />
          <input
            type="text"
            placeholder="Buscar módulo..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-andina-surface/50 border border-andina-border text-xs text-andina-text placeholder:text-andina-text/40 focus:outline-none focus:ring-2 focus:ring-andina-primary/20 focus:border-andina-primary/50 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative p-2 text-andina-text/60 hover:text-andina-primary transition-all hover:bg-andina-primary/10 rounded-xl">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-andina-primary rounded-full border-2 border-andina-bg shadow-[0_0_8px_#2ea84f]" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-andina-border">
          <div className="text-right hidden xs:block">
            <p className="text-xs font-black text-white tracking-tight leading-none mb-1">
               {role === "socio" ? "Socio Operativo" : "Adm. Podocarpus"}
            </p>
            <div className="flex items-center justify-end gap-1.5">
              <div className="w-1 h-1 rounded-full bg-andina-primary animate-ping" />
              <p className="text-[8px] text-andina-primary font-mono uppercase tracking-widest font-black">Sistema Vivo</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-andina-surface to-andina-bg flex items-center justify-center text-xs font-black text-andina-primary border border-andina-border hover:border-andina-primary cursor-pointer transition-all shadow-lg active:scale-90">
            {role === "socio" ? "SO" : "AP"}
          </div>
        </div>
      </div>
    </header>
  );
}
