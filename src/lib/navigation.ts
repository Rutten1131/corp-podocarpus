import {
  LayoutDashboard,
  Users,
  MapPin,
  Landmark,
  Megaphone,
  Monitor,
  Banknote,
  DollarSign,
  Route,
  Wrench,
  Settings
} from "lucide-react";

export const NAV_COOPERATIVA = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Socios", href: "/dashboard/socios", icon: Users, description: "Gestión de socios y expedientes" },
  { label: "Tracking GPS", href: "/dashboard/tracking", icon: MapPin, description: "Localización de unidades en tiempo real" },
  { label: "Contabilidad", href: "/dashboard/contabilidad", icon: Landmark, description: "Gestión financiera y estados de cuenta" },
  { label: "Marketing", href: "/dashboard/marketing", icon: Megaphone, description: "Campañas y comunicaciones" },
  { label: "Publicidad", href: "/dashboard/publicidad", icon: Monitor, description: "Gestión de pautas publicitarias" },
  { label: "Monetización", href: "/dashboard/monetizacion", icon: Banknote, description: "Control de ingresos y pagos" },
  { label: "Configuración", href: "/dashboard/configuracion", icon: Settings, description: "Personalizar visibilidad de módulos" },
];

export const NAV_SOCIO = [
  { label: "Cobranzas", href: "/dashboard/cobranzas", icon: DollarSign, description: "Cobros y facturación" },
  { label: "Mi Ruta", href: "/dashboard/rutas", icon: Route, description: "Visualización de rutas asignadas" },
  { label: "Tracking Vehículo", href: "/dashboard/tracking", icon: MapPin, description: "Estado de la unidad" },
  { label: "Portal Padres", href: "/dashboard/padres", icon: Users, description: "Comunicación con representantes" },
  { label: "Mantenimiento", href: "/dashboard/mantenimiento", icon: Wrench, description: "Reportes técnicos y revisiones" },
];
