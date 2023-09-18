// resultado.model.ts
export interface Estadisticas {
  nombre: string;
  victorias: number;
  derrotas: number;
}




export interface Resultados {
  nombre: string;  
  partida: string;
    jugador1: string;
    jugador2: string;
    ganador: string;
    fecha: Date;
    estadisticas: Estadisticas; 
  }
  