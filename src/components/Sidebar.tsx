"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Bus,
  MapPin,
  Route,
  Shield,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Briefcase,
  Wrench,
  QrCode,
  Landmark
} from "lucide-react";

// Tipos de perfil
type ProfileType = "cooperativa" | "socio";

// Menú Cooperativa (Gerente)
const NAV_COOPERATIVA = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Socios", href: "/dashboard/socios", icon: Users },
  { label: "Tracking GPS", href: "/dashboard/tracking", icon: MapPin },
  { label: "Contabilidad", href: "/dashboard/contabilidad", icon: Landmark },
];

// Menú Socio (Operador)
const NAV_SOCIO = [
  { label: "Cobranzas", href: "/dashboard/cobranzas", icon: DollarSign },
  { label: "Mi Ruta", href: "/dashboard/rutas", icon: Route },
  { label: "Tracking Vehículo", href: "/dashboard/tracking", icon: MapPin },
  { label: "Portal Padres", href: "/dashboard/padres", icon: Users },
  { label: "Mantenimiento", href: "/dashboard/mantenimiento", icon: Wrench },
];

// Contexto simulado global para el MVP
export const useProfile = () => {
  // En un entorno real esto usaría Context API o Zustand
  const [profile, setProfile] = useState<ProfileType>("cooperativa");
  return { profile, setProfile };
};

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  
  // Configuración del perfil basado en la URL
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

  const navItems = profile === "cooperativa" ? NAV_COOPERATIVA : NAV_SOCIO;

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-surface-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo as Link back to Home */}
      <Link href="/" className="flex items-center gap-3 px-4 h-16 border-b border-surface-700/50 hover:bg-surface-800 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-lg font-bold text-surface-900 shrink-0">
          P
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold leading-tight truncate text-white">Podocarpus</h1>
            <p className="text-[10px] text-surface-400 leading-tight">CRM Cooperativa</p>
          </div>
        )}
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {!collapsed && (
           <p className="px-3 text-[10px] text-surface-500 font-semibold uppercase tracking-wider mb-2">
              {profile === "cooperativa" ? "Módulos Administrativos" : "Gestión Operativa"}
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-brand-500/15 text-brand-400"
                  : "text-surface-400 hover:text-white hover:bg-surface-800"
              }`}
            >
              <Icon
                size={20}
                className={`shrink-0 ${isActive ? "text-brand-400" : "text-surface-500 group-hover:text-brand-400"}`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-surface-700/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}

// Top bar component
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-surface-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-100 text-sm text-surface-700 placeholder:text-surface-400 border-0 focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors">
          <Bell size={20} className="text-surface-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-surface-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xs font-bold text-surface-900 border-2 border-white shadow-sm">
            WG
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-surface-800 leading-tight">Usuario Demo</p>
            <p className="text-[11px] text-brand-600 font-medium">Conectado</p>
          </div>
        </div>
      </div>
    </header>
  );
}
