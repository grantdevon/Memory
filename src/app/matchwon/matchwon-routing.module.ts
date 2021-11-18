import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchwonPage } from './matchwon.page';

const routes: Routes = [
  {
    path: '',
    component: MatchwonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchwonPageRoutingModule {}
