import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Piedra-Papel-Tijera';
  
  constructor(private router: Router) {}

  

}


/*import { Component } from '@angular/core';
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
    // Validar que el nombre no esté vacío
    if (this.nombre.trim() !== '') {
      // Navegar al componente de juego y pasar el nombre como parámetro
      this.router.navigate(['/juego', this.nombre]);
    }
  }
}*/