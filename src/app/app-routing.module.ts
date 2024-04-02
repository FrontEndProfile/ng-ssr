import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeatilCardComponent } from './deatil-card/deatil-card.component';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  { path: 'home', component: CardListComponent },
  {
    path: 'detail/:id',
    component: DeatilCardComponent,
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
