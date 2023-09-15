import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; // servicio FirebaseService
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  nombreJugador: string | null;
  resultado: string = '';
  victoriasJugador: number = 0;
  victoriasPC: number = 0;
  jugadasRealizadas: number = 0;
  juegoTerminado: boolean = false;
  estadisticasJugador: any = {};

  


  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService // Inyecta el servicio FirebaseService
  ) {this.nombreJugador=this.route.snapshot.paramMap.get('nombre')}

  ngOnInit() {

    if (this.nombreJugador) {
      this.firebaseService.obtenerEstadisticas(this.nombreJugador).subscribe((data) => {
          this.estadisticasJugador = data;
        });
    }
    
    };
    ingresarNombre() {
     console.log('nombre',this.nombreJugador);
      // Obtener estadísticas cuando el usuario ingresa su nombre
      if (this.nombreJugador) {
        this.firebaseService.obtenerEstadisticas(this.nombreJugador).subscribe((data) => {
            this.estadisticasJugador = data;
          });
      }
    }

  jugar(opcionJugador: string) {
    
    if (!this.juegoTerminado) {
      if (!this.nombreJugador || this.nombreJugador.length < 4) {
        alert('Ingresa un nombre válido con al menos 4 caracteres.');
        return; // Salir de la función si el nombre no es válido
      }
      // Lógica para determinar la opción de la PC
      const opciones = ['piedra', 'papel', 'tijera'];
      const opcionPC = opciones[Math.floor(Math.random() * 3)];
      const ganador = this.determinarGanador(opcionJugador, opcionPC);
      // Lógica para determinar el ganador
      if (opcionJugador === opcionPC) {
        this.resultado = 'Empate';
      } else if (
        (opcionJugador === 'piedra' && opcionPC === 'tijera') ||
        (opcionJugador === 'papel' && opcionPC === 'piedra') ||
        (opcionJugador === 'tijera' && opcionPC === 'papel')
      ) {
        this.resultado = 'Ganaste';
        this.victoriasJugador++;
      } else {
        this.resultado = 'Perdiste';
        this.victoriasPC++;
      }

      this.jugadasRealizadas++;

      if (this.jugadasRealizadas === 3) {
        this.juegoTerminado = true;
      }
      
      // Si el juego ha terminado, registra el resultado en Firebase
      if (this.juegoTerminado) {
        const ganador = this.victoriasJugador > this.victoriasPC ? 'jugador' : 'pc';
        this.firebaseService.registrarResultado('partida1','jugador', 'pc', ganador);
      }
    }
  }

  reiniciarJuego() {
    // Reinicia el juego
    this.jugadasRealizadas = 0;
    this.victoriasJugador = 0;
    this.victoriasPC = 0;
    this.resultado = '';
    this.juegoTerminado = false;
  }

  private determinarGanador(opcionJugador: string, opcionPC: string): string {
    if (opcionJugador === opcionPC) {
      return 'empate';
    } else if (
      (opcionJugador === 'piedra' && opcionPC === 'tijera') ||
      (opcionJugador === 'papel' && opcionPC === 'piedra') ||
      (opcionJugador === 'tijera' && opcionPC === 'papel')
    ) {
      return 'jugador';
    } else {
      return 'pc';
    }
  }
}



