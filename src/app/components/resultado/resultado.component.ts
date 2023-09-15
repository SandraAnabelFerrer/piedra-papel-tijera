import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Resultados} from 'src/app/model/resultado.model'; // Importa la interfaz Resultado
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
})
export class ResultadoComponent implements OnInit {
  resultados: Resultados[] = [];
  nombreJugador: string = ''; 
  constructor(private route: ActivatedRoute,private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombreJugador = params['nombre'];
    });

    // Ahora puedes usar this.nombreJugador para obtener las estadísticas del jugador
    this.firebaseService.obtenerEstadisticas(this.nombreJugador).subscribe((data: Resultados[]) => {
      this.resultados = data;
    });
  }
}





