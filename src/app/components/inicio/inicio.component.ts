import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  nombre: string = '';

  constructor(private router: Router) {}

  iniciarJuego() {
    console.log(this.nombre);
    // Validar que el nombre no esté vacío
    if (this.nombre.trim() !== '') {
      // Navegar al componente de juego y pasar el nombre como parámetro
      this.router.navigate(['/juego', this.nombre]);
    }
  }
}
