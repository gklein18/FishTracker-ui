import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  // ... existing routes ...
  {
    path: 'stats/:userId',
    component: StatsComponent,
    data: { title: 'Fishing Statistics' }
  },
  // ... other routes ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
