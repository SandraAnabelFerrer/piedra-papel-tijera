import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { JuegoComponent } from './components/juego/juego.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

const routes: Routes = [

  { path: '', redirectTo: '/juego', pathMatch: 'full' }, // Ruta por defecto
  { path: 'juego/:nombreJugador', component: JuegoComponent }, // Ruta para la página inicial (juego.html)
  { path: 'resultado', component: ResultadoComponent },
  

];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,],
  exports: [RouterModule]
  
  
    
})
export class AppRoutingModule { }

