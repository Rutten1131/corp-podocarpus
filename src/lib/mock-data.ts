// ============================================================
// MOCK DATA — Cooperativa Podocarpus CRM Demo
// Datos realistas de Loja, Ecuador
// ============================================================

export const COOPERATIVA = {
  nombre: "Cooperativa de Transporte Escolar Podocarpus",
  ruc: "1190012345001",
  ciudad: "Loja",
  provincia: "Loja",
  totalUnidades: 74,
  marketShare: 45,
  fundada: "2005",
  gerente: "Wilmer González",
  logo: "🚌",
};

export interface Socio {
  id: string;
  nombre: string;
  cedula: string;
  telefono: string;
  email: string;
  unidad: string;
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  ruta: string;
  pasajeros: number;
  pagosMes: number;
  pagosRecibidos: number;
  estado: "activo" | "inactivo" | "suspendido";
  foto: string;
  fechaIngreso: string;
  proximoMantenimiento: string;
  kmActual: number;
  gastoMensual: number;
  ingresoMensual: number;
  estadoPago: 'al dia' | 'pendiente';
}

export const SOCIOS: Socio[] = [
  { id: "S001", nombre: "Carlos Armijos", cedula: "1104567890", telefono: "0991234567", email: "carmijos@gmail.com", unidad: "U-01", placa: "LAA-0123", marca: "Hyundai", modelo: "County", anio: 2020, ruta: "Ruta 1 - La Argelia → Centro", pasajeros: 28, pagosMes: 28, pagosRecibidos: 24, estado: "activo", foto: "CA", fechaIngreso: "2015-03-12", proximoMantenimiento: "2026-04-20", kmActual: 85420, gastoMensual: 380, ingresoMensual: 1680, estadoPago: 'pendiente' },
  { id: "S002", nombre: "María Cueva", cedula: "1104567891", telefono: "0992345678", email: "mcueva@gmail.com", unidad: "U-02", placa: "LAA-0456", marca: "Toyota", modelo: "Coaster", anio: 2019, ruta: "Ruta 2 - Celi Román → UTPL", pasajeros: 32, pagosMes: 32, pagosRecibidos: 30, estado: "activo", foto: "MC", fechaIngreso: "2012-08-20", proximoMantenimiento: "2026-04-18", kmActual: 102300, gastoMensual: 420, ingresoMensual: 1920, estadoPago: 'al dia' },
  { id: "S003", nombre: "Jorge Pineda", cedula: "1104567892", telefono: "0993456789", email: "jpineda@gmail.com", unidad: "U-03", placa: "LAA-0789", marca: "Hyundai", modelo: "County", anio: 2021, ruta: "Ruta 3 - Punzara → La Pradera", pasajeros: 25, pagosMes: 25, pagosRecibidos: 25, estado: "activo", foto: "JP", fechaIngreso: "2018-01-15", proximoMantenimiento: "2026-05-01", kmActual: 62100, gastoMensual: 310, ingresoMensual: 1500, estadoPago: 'al dia' },
  { id: "S004", nombre: "Ana Morocho", cedula: "1104567893", telefono: "0994567890", email: "amorocho@gmail.com", unidad: "U-04", placa: "LAA-1012", marca: "Nissan", modelo: "Civilian", anio: 2018, ruta: "Ruta 4 - Zamora Huayco → Centro", pasajeros: 30, pagosMes: 30, pagosRecibidos: 22, estado: "activo", foto: "AM", fechaIngreso: "2010-06-22", proximoMantenimiento: "2026-04-15", kmActual: 134500, gastoMensual: 520, ingresoMensual: 1800, estadoPago: 'pendiente' },
  { id: "S005", nombre: "Luis Sarango", cedula: "1104567894", telefono: "0995678901", email: "lsarango@gmail.com", unidad: "U-05", placa: "LAA-1345", marca: "Hyundai", modelo: "County", anio: 2022, ruta: "Ruta 5 - Tierras Coloradas → UNL", pasajeros: 26, pagosMes: 26, pagosRecibidos: 26, estado: "activo", foto: "LS", fechaIngreso: "2020-02-10", proximoMantenimiento: "2026-05-10", kmActual: 41200, gastoMensual: 280, ingresoMensual: 1560, estadoPago: 'al dia' },
  { id: "S006", nombre: "Rosa Guamán", cedula: "1104567895", telefono: "0996789012", email: "rguaman@gmail.com", unidad: "U-06", placa: "LAA-1678", marca: "Toyota", modelo: "Coaster", anio: 2017, ruta: "Ruta 6 - San Cayetano → Clodoveo Jaramillo", pasajeros: 22, pagosMes: 22, pagosRecibidos: 18, estado: "activo", foto: "RG", fechaIngreso: "2009-11-05", proximoMantenimiento: "2026-04-22", kmActual: 158700, gastoMensual: 610, ingresoMensual: 1320, estadoPago: 'pendiente' },
  { id: "S007", nombre: "Fernando Castillo", cedula: "1104567896", telefono: "0997890123", email: "fcastillo@gmail.com", unidad: "U-07", placa: "LAA-2011", marca: "Hyundai", modelo: "County", anio: 2023, ruta: "Ruta 7 - Esteban Godoy → La Tebaida", pasajeros: 35, pagosMes: 35, pagosRecibidos: 33, estado: "activo", foto: "FC", fechaIngreso: "2022-04-18", proximoMantenimiento: "2026-05-15", kmActual: 28900, gastoMensual: 250, ingresoMensual: 2100, estadoPago: 'al dia' },
  { id: "S008", nombre: "Patricia Ordóñez", cedula: "1104567897", telefono: "0998901234", email: "pordonez@gmail.com", unidad: "U-08", placa: "LAA-2344", marca: "Nissan", modelo: "Civilian", anio: 2016, ruta: "Ruta 8 - Motupe → Colegio Bernardo Valdivieso", pasajeros: 18, pagosMes: 18, pagosRecibidos: 15, estado: "activo", foto: "PO", fechaIngreso: "2008-09-30", proximoMantenimiento: "2026-04-14", kmActual: 178400, gastoMensual: 690, ingresoMensual: 1080, estadoPago: 'pendiente' },
];

export interface Pago {
  id: string;
  padre: string;
  estudiante: string;
  socioId: string;
  monto: number;
  mes: string;
  estado: "pagado" | "pendiente" | "vencido";
  fechaPago?: string;
  metodo?: string;
}

export const PAGOS: Pago[] = [
  { id: "P001", padre: "Roberto Maldonado", estudiante: "Sofía Maldonado", socioId: "S001", monto: 60, mes: "Abril 2026", estado: "pagado", fechaPago: "2026-04-05", metodo: "Transferencia" },
  { id: "P002", padre: "Carmen Espinosa", estudiante: "Diego Espinosa", socioId: "S001", monto: 60, mes: "Abril 2026", estado: "pendiente" },
  { id: "P003", padre: "Miguel Jaramillo", estudiante: "Valentina Jaramillo", socioId: "S001", monto: 60, mes: "Abril 2026", estado: "pagado", fechaPago: "2026-04-03", metodo: "Efectivo" },
  { id: "P004", padre: "Lucía Montaño", estudiante: "Andrés Montaño", socioId: "S001", monto: 60, mes: "Abril 2026", estado: "vencido" },
  { id: "P005", padre: "Pedro Sánchez", estudiante: "Isabella Sánchez", socioId: "S002", monto: 60, mes: "Abril 2026", estado: "pagado", fechaPago: "2026-04-01", metodo: "Transferencia" },
  { id: "P006", padre: "Victoria Carrión", estudiante: "Mateo Carrión", socioId: "S002", monto: 60, mes: "Abril 2026", estado: "pagado", fechaPago: "2026-04-02", metodo: "Efectivo" },
  { id: "P007", padre: "Francisco Aguilar", estudiante: "Camila Aguilar", socioId: "S003", monto: 60, mes: "Abril 2026", estado: "pendiente" },
  { id: "P008", padre: "Elena Rojas", estudiante: "Santiago Rojas", socioId: "S004", monto: 60, mes: "Abril 2026", estado: "vencido" },
  { id: "P009", padre: "Gabriel Torres", estudiante: "Emilia Torres", socioId: "S004", monto: 60, mes: "Abril 2026", estado: "pagado", fechaPago: "2026-04-06", metodo: "Depósito" },
  { id: "P010", padre: "Diana Villavicencio", estudiante: "Sebastián Villavicencio", socioId: "S005", monto: 60, mes: "Abril 2026", estado: "pagado", fechaPago: "2026-04-04", metodo: "Transferencia" },
];

export interface Mantenimiento {
  id: string;
  socioId: string;
  tipo: string;
  descripcion: string;
  costo: number;
  fecha: string;
  km: number;
  proximoKm: number;
  estado: "completado" | "pendiente" | "urgente";
}

export const MANTENIMIENTOS: Mantenimiento[] = [
  { id: "M001", socioId: "S001", tipo: "Cambio de Aceite", descripcion: "Aceite sintético 15W-40 + filtro", costo: 85, fecha: "2026-03-15", km: 84000, proximoKm: 89000, estado: "completado" },
  { id: "M002", socioId: "S001", tipo: "Llantas", descripcion: "Rotación de llantas delanteras", costo: 40, fecha: "2026-03-20", km: 84500, proximoKm: 94500, estado: "completado" },
  { id: "M003", socioId: "S002", tipo: "Frenos", descripcion: "Cambio pastillas de freno traseras", costo: 120, fecha: "2026-04-01", km: 101500, proximoKm: 121500, estado: "completado" },
  { id: "M004", socioId: "S004", tipo: "Cambio de Aceite", descripcion: "URGENTE - Aceite vencido hace 2000km", costo: 90, fecha: "2026-04-13", km: 134500, proximoKm: 139500, estado: "urgente" },
  { id: "M005", socioId: "S006", tipo: "Suspensión", descripcion: "Revisión amortiguadores delanteros", costo: 250, fecha: "2026-04-10", km: 157800, proximoKm: 177800, estado: "pendiente" },
  { id: "M006", socioId: "S008", tipo: "Motor", descripcion: "Afinamiento general + bujías", costo: 180, fecha: "2026-04-12", km: 177500, proximoKm: 187500, estado: "urgente" },
];

export interface Ruta {
  id: string;
  nombre: string;
  socioId: string;
  colegio: string;
  horaSalida: string;
  horaLlegada: string;
  paradas: number;
  distanciaKm: number;
  coordenadas: [number, number][];
}

export const RUTAS: Ruta[] = [
  { id: "R001", nombre: "Ruta 1 - La Argelia → Centro", socioId: "S001", colegio: "U.E. La Dolorosa", horaSalida: "06:30", horaLlegada: "07:15", paradas: 8, distanciaKm: 12.5, coordenadas: [[-4.0045, -79.2100], [-4.0020, -79.2050], [-3.9990, -79.2000]] },
  { id: "R002", nombre: "Ruta 2 - Celi Román → UTPL", socioId: "S002", colegio: "UTPL Escuela", horaSalida: "06:15", horaLlegada: "07:00", paradas: 10, distanciaKm: 15.2, coordenadas: [[-3.9850, -79.2200], [-3.9900, -79.2150], [-3.9950, -79.2050]] },
  { id: "R003", nombre: "Ruta 3 - Punzara → La Pradera", socioId: "S003", colegio: "Colegio Pío Jaramillo", horaSalida: "06:45", horaLlegada: "07:20", paradas: 6, distanciaKm: 8.7, coordenadas: [[-4.0100, -79.2050], [-4.0080, -79.2020], [-4.0050, -79.1980]] },
];

export interface UnidadGPS {
  id: string;
  socioId: string;
  placa: string;
  lat: number;
  lng: number;
  velocidad: number; // km/h
  estado: "en-ruta" | "detenido" | "fuera-servicio";
  ultimaAct: string;
  combustible: number; // %
}

export const UNIDADES_GPS: UnidadGPS[] = [
  { id: "G001", socioId: "S001", placa: "LAA-0123", lat: -4.0020, lng: -79.2050, velocidad: 35, estado: "en-ruta", ultimaAct: "08:42:15", combustible: 72 },
  { id: "G002", socioId: "S002", placa: "LAA-0456", lat: -3.9900, lng: -79.2150, velocidad: 0, estado: "detenido", ultimaAct: "08:40:30", combustible: 45 },
  { id: "G003", socioId: "S003", placa: "LAA-0789", lat: -4.0080, lng: -79.2020, velocidad: 28, estado: "en-ruta", ultimaAct: "08:43:01", combustible: 88 },
  { id: "G004", socioId: "S004", placa: "LAA-1012", lat: -3.9950, lng: -79.2000, velocidad: 42, estado: "en-ruta", ultimaAct: "08:41:45", combustible: 31 },
  { id: "G005", socioId: "S005", placa: "LAA-1345", lat: -4.0100, lng: -79.2150, velocidad: 0, estado: "fuera-servicio", ultimaAct: "07:30:00", combustible: 15 },
  { id: "G006", socioId: "S006", placa: "LAA-1678", lat: -3.9880, lng: -79.2080, velocidad: 22, estado: "en-ruta", ultimaAct: "08:42:55", combustible: 63 },
  { id: "G007", socioId: "S007", placa: "LAA-2011", lat: -4.0060, lng: -79.1950, velocidad: 38, estado: "en-ruta", ultimaAct: "08:43:10", combustible: 91 },
  { id: "G008", socioId: "S008", placa: "LAA-2344", lat: -3.9920, lng: -79.2100, velocidad: 15, estado: "en-ruta", ultimaAct: "08:42:00", combustible: 52 },
];

// KPIs Gerenciales
export const KPI = {
  totalSocios: 74,
  sociosActivos: 71,
  totalPasajeros: 1842,
  ingresoMensual: 110520,
  gastoMensual: 31820,
  utilidadMensual: 78700,
  morosidad: 12.4,
  unidadesEnRuta: 68,
  mantenimientosPendientes: 8,
  documentosVencidos: 3,
  satisfaccion: 4.6,
  contratos: { activos: 28, porVencer: 5, vencidos: 2 },
};

// Datos mensuales para gráficas
export const INGRESOS_MENSUALES = [
  { mes: "Oct", ingresos: 98200, gastos: 28400 },
  { mes: "Nov", ingresos: 102500, gastos: 30100 },
  { mes: "Dic", ingresos: 95800, gastos: 35200 },
  { mes: "Ene", ingresos: 108900, gastos: 29800 },
  { mes: "Feb", ingresos: 106300, gastos: 31500 },
  { mes: "Mar", ingresos: 110520, gastos: 31820 },
];

export const OCUPACION_RUTAS = [
  { ruta: "Ruta 1", ocupacion: 86 },
  { ruta: "Ruta 2", ocupacion: 94 },
  { ruta: "Ruta 3", ocupacion: 78 },
  { ruta: "Ruta 4", ocupacion: 73 },
  { ruta: "Ruta 5", ocupacion: 100 },
  { ruta: "Ruta 6", ocupacion: 68 },
  { ruta: "Ruta 7", ocupacion: 92 },
  { ruta: "Ruta 8", ocupacion: 56 },
];
