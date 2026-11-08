import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventListComponent {
  private eventoService = inject(EventoService);
  public eventos = this.eventoService.eventos;
}