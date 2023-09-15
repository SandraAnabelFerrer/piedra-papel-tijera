import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JuegoComponent } from './components/juego/juego.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

const routes: Routes = [

{path:'juego', component: JuegoComponent},
{path:'resultado', component: ResultadoComponent},


];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

