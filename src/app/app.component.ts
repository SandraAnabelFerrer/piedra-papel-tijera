import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Piedra-Papel-Tijera';
  
  componenteResultado = false;
  componenteJuego = true;
  constructor() {}

  mostrarResultados(){
    this.componenteResultado = true;
    this.componenteJuego = false;
  }

  regresaralJuego(){
    this.componenteResultado = false;
    this.componenteJuego = true;
  }
}


