"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
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
  
  const [profile, setProfile] = useState<ProfileType>("cooperativa");
  const searchParams = useSearchParams();

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "socio") {
      setProfile("socio");
    } else if (role === "cooperativa") {
      setProfile("cooperativa");
    }
  }, [searchParams]);

  const { isModuleVisible } = useModuleContext();
  const navItems = (profile === "cooperativa" ? NAV_COOPERATIVA : NAV_SOCIO).filter(item => 
    item.href === "/dashboard" || item.href === "/dashboard/configuracion" || isModuleVisible(item.href)
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-andina-surface border-r border-andina-border flex flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <Link href="/" className="flex items-center gap-3 px-4 h-16 border-b border-andina-border hover:bg-white/5 transition-colors group">
        <PodocarpusLogo size="md" />
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-heading font-bold tracking-wide text-andina-text truncate">Podocarpus</h1>
            <p className="text-[10px] text-andina-accent font-mono uppercase tracking-widest mt-0.5">Autoridad Andina</p>
          </div>
        )}
      </Link>

      <nav className="flex-1 py-6 space-y-1 overflow-x-hidden overflow-y-auto">
        {!collapsed && (
           <p className="px-5 text-[10px] text-andina-text/40 font-mono uppercase tracking-widest mb-4">
              {profile === "cooperativa" ? "Módulos" : "Operativa"}
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
              className={`relative flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? "text-andina-primary bg-andina-primary/5"
                  : "text-andina-text/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-andina-primary shadow-[0_0_10px_var(--color-andina-primary)]" />
              )}
              <Icon
                size={20}
                className={`shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isActive ? "text-andina-primary" : "text-andina-text/50 group-hover:text-andina-primary/80"}`}
              />
              {!collapsed && <span className="truncate transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-andina-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-andina-text/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-andina-bg/80 backdrop-blur-xl border-b border-andina-border flex items-center justify-between px-6">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-andina-text/40 group-focus-within:text-andina-primary transition-colors" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-andina-surface border border-andina-border text-sm text-andina-text placeholder:text-andina-text/40 focus:outline-none focus:ring-1 focus:ring-andina-primary/50 focus:border-andina-primary/50 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-andina-text/60 hover:text-white transition-colors hover:scale-110">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-andina-primary rounded-full border-2 border-andina-bg" />
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-andina-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-andina-text leading-tight">Usuario Demo</p>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-andina-primary animate-pulse shadow-[0_0_5px_var(--color-andina-primary)]"></span>
              <p className="text-[10px] text-andina-primary font-mono uppercase tracking-wider">Conectado</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-andina-surface flex items-center justify-center text-xs font-bold text-andina-text border border-andina-border hover:border-andina-primary/50 cursor-pointer transition-colors">
            WG
          </div>
        </div>
      </div>
    </header>
  );
}
