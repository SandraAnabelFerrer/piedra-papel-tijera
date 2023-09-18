import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Piedra-Papel-Tijera';
  nombreJugador: string = '';
  componenteResultado = false;
  componenteJuego = true;
  constructor(private router: Router) {}

  mostrarResultados(){
    this.componenteResultado = true;
    this.componenteJuego = false;
  }

  regresaralJuego(){
     // Restablece el nombre del jugador a una cadena vacía
  this.nombreJugador = '';

  // Redirige a la pantalla de inicio del juego
  
    this.componenteResultado = false;
    this.componenteJuego = true;
  }
}


