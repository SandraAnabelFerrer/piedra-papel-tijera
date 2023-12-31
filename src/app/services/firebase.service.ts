import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
    console.log('se registro en base de datos');
    const resultado = {
      partida,
      jugador1,
      jugador2,
      ganador,
      
      fecha: new Date().toString(),
      
    };
    
    return this.firestore.list('resultados/').push(resultado);
    
  }

  registrarResultadoMejorDeTres( ganadorMejorDeTres: string) {
    const resultadoRef ={
     
      ganadorMejorDeTres,
    };
    return this.firestore.list('ganadorMejordeTres').push(resultadoRef);
  }
  

  // incrementarEstadistica(jugador: string, estadistica: string) {
  //   this.firestore.object(`estadisticas/${jugador}/${estadistica}`)
  //     .valueChanges()
  //     .subscribe((currentValue: any) => {
  //       const newValue = (currentValue || 0) + 1;
  //       this.firestore.object(`estadisticas/${jugador}/${estadistica}`).set(newValue);
  //     });
  // }

  // incrementarVictorias(jugador: string, resultado: string) {
  //   if (resultado === 'jugador') {
  //     this.incrementarEstadistica(jugador, 'victorias');
  //   } else {
  //     this.incrementarEstadistica(jugador, 'derrotas');
  //   }
  // }

  // incrementarDerrotas(jugador: string, resultado: string) {
  //   if (resultado === 'jugador') {
  //     this.incrementarEstadistica(jugador, 'derrotas');
  //   } else {
  //     this.incrementarEstadistica(jugador, 'victorias');
  //   }
  // }

  obtenerEstadisticas() {
    return this.firestore.list('resultados').snapshotChanges();
   }
}

