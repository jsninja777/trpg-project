import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailComponent } from './pages/player-detail/player-detail.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },
  {
    path: 'players',
    component: PlayerListComponent,
  },
  {
    path: 'players/:id',
    component: PlayerDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
