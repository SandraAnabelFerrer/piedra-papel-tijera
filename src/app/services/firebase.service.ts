import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  [x: string]: any;
  constructor(private firestore: AngularFireDatabase) {}
  
  registrarNombre(nombre: string) {
    const jugador = nombre;
    
    return this.firestore.list('nombre').push(jugador);
  }

  registrarResultado(partida: string, jugador1: string, jugador2: string, ganador: string) {
    const resultado = {
      partida,
      jugador1,
      jugador2,
      ganador,
      fecha: new Date().toString(),
    };
    return this.firestore.list('resultados').push(resultado);
  }

  registrarResultadoMejordeTres(nombreJugador:String, ganador :string ){

    const resultadoRef= this['db'].object('resultados/${nombreJugador}MejorDeTres');
    resultadoRef.set(ganador);
    this['nombreGanadorMejorDeTres'] = ganador; 
  }

  incrementarEstadistica(jugador: string, estadistica: string) {
    this.firestore.object(`estadisticas/${jugador}/${estadistica}`)
      .valueChanges()
      .subscribe((currentValue: any) => {
        const newValue = (currentValue || 0) + 1;
        this.firestore.object(`estadisticas/${jugador}/${estadistica}`).set(newValue);
      });
  }

  incrementarVictorias(jugador: string, resultado: string) {
    if (resultado === 'jugador') {
      this.incrementarEstadistica(jugador, 'victorias');
    } else {
      this.incrementarEstadistica(jugador, 'derrotas');
    }
  }

  incrementarDerrotas(jugador: string, resultado: string) {
    if (resultado === 'jugador') {
      this.incrementarEstadistica(jugador, 'derrotas');
    } else {
      this.incrementarEstadistica(jugador, 'victorias');
    }
  }

  obtenerEstadisticas(jugador: string): Observable<any> {
    return this.firestore.object(`estadisticas/${jugador}`).valueChanges();
  }
}
