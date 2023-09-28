import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Resultados } from 'src/app/model/resultado.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
})
export class ResultadoComponent implements OnInit {
  resultados: any;
  nombreJugador: string = '';
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
   
  ) {
   // this.firebaseService.obtenerEstadisticas();
  }

  ngOnInit() {
    // this.subscription = this.route.params.subscribe((params) => {
    //   this.nombreJugador = params['nombre'];
    //   if (this.nombreJugador) {
    //     this.cargarEstadisticas(this.nombreJugador);
    //   }
    // });
    this.firebaseService.obtenerEstadisticas().subscribe(resp =>{
      console.log(resp);
      this.resultados = resp;
    
    });

  }





  // cargarEstadisticas(nombreJugador: string) {
  //   this.subscription = this.firebaseService
  // .obtenerEstadisticas()
  // .subscribe({
  //   next: (data: any) => {
  //     this.resultados = data.resultados;
  //     this.cdr.detectChanges();
  //     console.log(this.resultados);
  //   },
  //   error: (error) => {
  //     console.error('Error al cargar estadísticas:', error);
  //   }
  // });

      
  }

//   ngOnDestroy() {
    
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }
// }
