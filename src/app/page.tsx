import Link from "next/link";
import { ShieldCheck, Bus, KeyRound, Building2, UserCircle2 } from "lucide-react";

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-400/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-info/10 rounded-full blur-[120px]"></div>

      <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-surface-200 flex items-center justify-center text-3xl font-extrabold text-brand-600 mb-6 relative">
          P
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-surface-900 rounded-full flex items-center justify-center text-white border-2 border-white">
            <KeyRound size={14} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-surface-900 tracking-tight leading-tight mb-3 text-center">
          Acceso al Sistema
        </h1>
        <p className="text-surface-500 max-w-md text-center mb-10">
          Bienvenido al CRM de Cooperativa Podocarpus. Seleccione su perfil para ingresar a su área de trabajo correspondiente.
        </p>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Perfil Gerencia */}
          <Link 
            href="/dashboard?role=cooperativa"
            className="group bg-white hover:bg-surface-900 border border-surface-200 hover:border-surface-900 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-surface-100 group-hover:bg-surface-800 flex items-center justify-center mb-6 transition-colors duration-300">
               <Building2 size={32} className="text-surface-700 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-surface-900 group-hover:text-white mb-2 transition-colors">
              Gerencia y Admin
            </h2>
            <p className="text-sm text-surface-500 group-hover:text-surface-400 transition-colors">
              Control general de flota, contabilidad, reportes SEPS y padrón de socios cooperados.
            </p>
          </Link>

          {/* Perfil Socio */}
          <Link 
            href="/dashboard?role=socio"
            className="group bg-white hover:bg-brand-500 border border-surface-200 hover:border-brand-500 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-50 group-hover:bg-brand-400/50 flex items-center justify-center mb-6 transition-colors duration-300">
               <UserCircle2 size={32} className="text-brand-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-surface-900 group-hover:text-white mb-2 transition-colors">
              Socio Operador
            </h2>
            <p className="text-sm text-surface-500 group-hover:text-brand-100 transition-colors">
              Gestión de vehículo, portal de padres, mantenimiento y control de cobros de su ruta assignada.
            </p>
          </Link>
        </div>

        <div className="mt-12 text-sm text-surface-400 flex items-center gap-2">
           <ShieldCheck size={16} className="text-success" />
           Entorno seguro y encriptado. Versión Demo v1.0.
        </div>
      </div>
    </div>
  );
}
