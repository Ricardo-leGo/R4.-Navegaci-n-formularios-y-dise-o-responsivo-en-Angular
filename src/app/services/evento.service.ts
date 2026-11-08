import { Injectable, signal } from '@angular/core';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventosState = signal<Evento[]>([
    {
      id: 1,
      titulo: 'Conferencia de Inteligencia Artificial',
      descripcion: 'Un evento para explorar las tendencias de IA y aprendizaje automático.',
      fecha: '2026-11-20',
      lugar: 'Auditorio Central UVEG',
      cupoDisponible: 15,
      imagenUrl: 'https://picsum.photos/id/0/400/250'
    },
    {
      id: 2,
      titulo: 'Taller de Desarrollo Web Full Stack',
      descripcion: 'Aprende a construir aplicaciones modernas con Angular y Node.js.',
      fecha: '2026-12-05',
      lugar: 'Laboratorio Virtual 3',
      cupoDisponible: 8,
      imagenUrl: 'https://picsum.photos/id/60/400/250'
    },
    {
      id: 3,
      titulo: 'Hackathon UVEG 2026',
      descripcion: 'Compite resolviendo retos de software en 48 horas intensivas.',
      fecha: '2026-12-15',
      lugar: 'Campus Virtual',
      cupoDisponible: 25,
      imagenUrl: 'https://picsum.photos/id/201/400/250'
    }
  ]);

  public eventos = this.eventosState.asReadonly();

  obtenerPorId(id: number): Evento | undefined {
    return this.eventosState().find(e => e.id === id);
  }

  registrarUsuario(eventoId: number): boolean {
    const lista = this.eventosState();
    const index = lista.findIndex(e => e.id === eventoId);
    if (index !== -1 && lista[index].cupoDisponible > 0) {
      const actualizada = [...lista];
      actualizada[index] = {
        ...actualizada[index],
        cupoDisponible: actualizada[index].cupoDisponible - 1
      };
      this.eventosState.set(actualizada);
      return true;
    }
    return false;
  }
}