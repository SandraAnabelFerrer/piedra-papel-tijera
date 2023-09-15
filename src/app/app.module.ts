import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegoComponent } from 'src/app/components/juego/juego.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    ResultadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Agrega FormsModule a los imports
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
