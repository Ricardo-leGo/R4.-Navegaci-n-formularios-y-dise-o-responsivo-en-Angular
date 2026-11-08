import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';

export function fechaFuturaValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const fechaIngresada = new Date(control.value);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return fechaIngresada < hoy ? { fechaPasada: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventoService = inject(EventoService);

  registroForm!: FormGroup;
  eventos = this.eventoService.eventos;
  eventoSeleccionado?: Evento;
  mensajeExito = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const selectedId = idParam ? Number(idParam) : '';

    this.registroForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      eventoId: [selectedId, [Validators.required]],
      fechaEvento: ['', [Validators.required, fechaFuturaValidator]]
    });

    if (selectedId) {
      this.cargarDatosEvento(Number(selectedId));
    }
  }

  onEventoChange(event: Event): void {
    const selectElem = event.target as HTMLSelectElement;
    const id = Number(selectElem.value);
    this.cargarDatosEvento(id);
  }

  private cargarDatosEvento(id: number): void {
    const ev = this.eventoService.obtenerPorId(id);
    if (ev) {
      this.eventoSeleccionado = ev;
      this.registroForm.patchValue({ fechaEvento: ev.fecha });
    }
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const { eventoId } = this.registroForm.value;
    const exito = this.eventoService.registrarUsuario(Number(eventoId));

    if (exito) {
      this.mensajeExito = '¡Registro completado exitosamente!';
      setTimeout(() => this.router.navigate(['/eventos']), 2000);
    } else {
      alert('No hay cupo disponible para el evento seleccionado.');
    }
  }
}