export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string; // Formato YYYY-MM-DD
  lugar: string;
  cupoDisponible: number;
  imagenUrl?: string;
}