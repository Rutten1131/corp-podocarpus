# 📜 Documentación Maestra: Ecosistema Digital Podocarpus
## Versión 2.0 — Estrategia de Autoridad Andina (Abril 2026)

Este documento constituye el registro exhaustivo de la visión, arquitectura, funcionalidad y estado actual del sistema desarrollado para la **Cooperativa de Transporte Escolar Podocarpus**.

---

## 1. Visión y Propósito (El "Por Qué")
El proyecto nace no solo como una herramienta de gestión, sino como un **Blindaje Patrimonial** para los 74 socios de la cooperativa. 

*   **Objetivo Estratégico:** Transformar la cooperativa en la entidad de transporte más tecnológica de Loja, eliminando la opacidad operativa y maximizando la rentabilidad mediante datos en tiempo real.
*   **ADN Visual (Andina):** Una interfaz de alta fidelidad ("Apple-style") que proyecta autoridad, seguridad y modernismo, diseñada para impresionar a clientes corporativos y al Consejo de Administración.

---

## 2. Stack Tecnológico (El "Cómo")
El sistema utiliza las tecnologías más avanzadas del ecosistema web moderno para garantizar velocidad, SEO y una experiencia fluida:

*   **Core:** [Next.js 16+](https://nextjs.org/) con compilador **Turbopack** para un desarrollo y build ultra-rápidos.
*   **Lenguaje:** **TypeScript** estricto para garantizar la integridad de los datos financieros y operativos.
*   **Estilización:** **Tailwind CSS** para un diseño responsivo y consistente.
*   **Animaciones:** **Framer Motion** para micro-interacciones cinematográficas y transiciones de alto impacto.
*   **Iconografía:** **Lucide React** para una simbología técnica y limpia.
*   **Automatización:** **Evolution API** integrada para notificaciones inteligentes vía WhatsApp.

---

## 3. Desglose de Módulos (El "Qué")

El CRM se divide en **11 módulos operativos** accesibles mediante un sistema de roles (Cooperativa vs. Socio).

### 3.1 Centro de Comando (Dashboard)
La pantalla principal que ofrece una visión 360° de la cooperativa.
-   **Análisis de Ingresos/Gastos:** Gráficos de área cinéticos con tooltips de cristal.
-   **KPIs de Flota:** Tarjetas dinámicas que muestran socios activos, morosidad y utilidad mensual.
-   **Efectividad de Rutas:** Gráfico de barras vertical que mide la ocupación territorial.

### 3.2 Gestión de Socios (`/socios`)
El inventario maestro de los 74 activos de la cooperativa.
-   **Fichas Técnicas:** Datos de unidad, placa, marca y estatus de mantenimiento.
-   **Estatus Financiero:** Control del "Estado de Pago" (Al día vs. Pendiente) sincronizado con el sistema de cobranzas.

### 3.3 Logística y Rutas (`/rutas`)
El corazón operativo del transporte.
-   **Mapa Táctico Responsivo:** Un visor de rutas que escala proporcionalmente en dispositivos móviles.
-   **Trazado de Trayectorias:** Visualización de paradas y recorridos optimizados.
-   **GPS dinámico:** Sistema preparado para la visualización de unidades en tiempo real.

### 3.4 Cobranzas y Recaudación (`/cobranzas`)
Módulo diseñado para reducir la morosidad y asegurar el flujo de caja.
-   **Control de Pensiones:** Registro individual por estudiante y representante.
-   **Acción Inmediata:** Botones de "Recordatorio WhatsApp" que envían avisos automáticos a los padres en mora.

### 3.5 Mantenimiento Preventivo (`/mantenimiento`)
Protección de la vida útil de las 74 unidades.
-   **Salud de Flota:** Indicadores visuales de proximidad de servicios (aceite, llantas, frenos).
-   **Bitácora de Ingeniería:** Historial completo de gastos y reparaciones por vehículo.

### 3.6 Marketing de Autoridad (`/marketing`)
Herramienta de crecimiento institucional.
-   **Zen Editor IA:** Generador de contenido asistido por IA para redes sociales y la web pública.
-   **Social Hub:** Calendario estratégico para programar la narrativa de la cooperativa.

### 3.7 Contabilidad y Finanzas (`/contabilidad`)
Transparencia absoluta para socios y entes reguladores (SEPS).
-   **Ledger Industrial:** Listado de transacciones con filtros avanzados.
-   **Reportes Maestros:** Capacidad de exportar estados de cuenta profesionales.

### 3.8 Otros Módulos Especializados
-   **Publicidad:** Gestión de la valla publicitaria digital móvil en cada unidad.
-   **Monetización:** Análisis de ingresos extra por publicidad y servicios especiales.
-   **Tracking:** Panel dedicado al rastreo histórico de flotas.
-   **Padres:** Portal de gestión de contactos y representantes.

---

## 4. Estado Actual y Estabilidad (Abril 2026)

Tras la última fase de optimización, el sistema se encuentra en **Estado de Producción**:

*   **Build Exitoso:** El sistema compila y se despliega sin errores de tipado o de pre-renderizado.
*   **Responsividad Móvil 2.0:** Todos los módulos, incluyendo el mapa de rutas y el asistente de IA, son 100% utilizables desde smartphones.
*   **Límites de Suspense:** Arquitectura optimizada para que el TopBar y el Sidebar funcionen correctamente durante la generación estática.
*   **Asistente IA Sincronizado:** El chatbot está configurado con protección anti-prompt-injection y notificaciones en tiempo real vía WhatsApp.

---

### Perfiles de Usuario
1.  **Administrador (Cooperativa):** Acceso total a métricas globales, marketing y finanzas macro.
2.  **Socio (Operativo):** Visión de "Gerente de su Vehículo", enfocado en su unidad, sus propios mantenimientos y sus cobros específicos.

---
*Este documento es la biblia técnica del MVP Podocarpus. Cada actualización de código debe reflejarse aquí para mantener la integridad del conocimiento del proyecto.*
