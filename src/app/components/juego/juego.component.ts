import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; // servicio FirebaseService
import { ActivatedRoute, Router } from '@angular/router';

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
  jugadasGanadasJugador: number = 0;
  jugadasGanadasPC: number = 0;
  jugadasRealizadas: number = 0;
  estadisticasJugador: any = {};
  juegoTerminado: boolean = false;
  juegoIniciado: boolean = false;
  nombreGanadorMejorDeTres: string = '';
  nombreValido: boolean = true;
  constructor(
    private route: ActivatedRoute, private router: Router,
    private firebaseService: FirebaseService // Inyecta el servicio FirebaseService
  ) { this.nombreJugador = this.route.snapshot.paramMap.get('nombre'); this.nombreGanadorMejorDeTres = ''; }

  ngOnInit() {
    

  }

  iniciarJuego() {

    console.log(this.nombreJugador);
    // Validar que el nombre no esté vacío
    if (this.nombreJugador?.trim() !== '') {
      // Navegar al componente de juego y pasar el nombre como parámetro
      this.router.navigate(['/juego', this.nombreJugador]);
      this.ingresarNombre();
      this.juegoIniciado = true;
    }

  }

  ingresarNombre() {
    console.log('nombre', this.nombreJugador);
    // Obtener estadísticas cuando el usuario ingresa su nombre
    if (this.nombreJugador) {
      this.firebaseService.registrarNombre(this.nombreJugador);

    }
  }

  jugar(opcionJugador: string) {

    if (!this.juegoTerminado) {
      if (!this.nombreJugador || this.nombreJugador.length < 4) {
        alert('Ingresa un nombre válido con al menos 4 caracteres.');
        this.nombreValido = false;
        return; // Salir de la función si el nombre no es válido
      }else{this.nombreValido = true;}
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

      if (ganador === 'jugador') {
        this.jugadasGanadasJugador++;
      } else if (ganador === 'pc') {
        this.jugadasGanadasPC++;
      }
      if (this.jugadasGanadasJugador === 2 || this.jugadasGanadasPC === 2) {
        this.juegoTerminado = true;
      }


      if (this.jugadasRealizadas === 3) {
        this.juegoTerminado = true;
        this.nombreGanadorMejorDeTres = this.determinarGanadorFinal() ?? '';
        this.firebaseService.registrarResultadoMejorDeTres(this.nombreGanadorMejorDeTres); // Llama a la función en el servicio
      }


      // Si el juego ha terminado, registra el resultado en Firebase
      if (this.juegoTerminado) {
        const ganador = this.victoriasJugador > this.victoriasPC ? 'jugador' : 'pc';
        this.firebaseService.registrarResultado('partida1', 'jugador', 'pc', ganador);
        //this.firebaseService.incrementarVictorias(this.nombreJugador, 'jugador');
      }

      // else {
      //   this.firebaseService.incrementarDerrotas(this.nombreJugador, 'pc');
      // }
    }
  }
  determinarGanadorFinal() {
    if (this.jugadasGanadasJugador > this.jugadasGanadasPC) {
      return this.nombreJugador;
    } else if (this.jugadasGanadasPC > this.jugadasGanadasJugador) {
      return 'PC';
    } else {
      return 'Empate';
    }
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
  reiniciarJuego() {
    // Reinicia el juego
    console.log('Función reiniciarJuego() llamada');
    this.jugadasRealizadas = 0;
    this.victoriasJugador = 0;
    this.victoriasPC = 0;
    this.resultado = '';
    this.jugadasGanadasJugador = 0;
    this.jugadasGanadasPC = 0;
    this.juegoTerminado = false;
    this.estadisticasJugador;
    this.juegoTerminado = false;
    this.juegoIniciado = false;
    this.nombreGanadorMejorDeTres = '';
    this.nombreJugador = '';
  }


}

