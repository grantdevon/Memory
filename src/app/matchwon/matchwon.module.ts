import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchwonPageRoutingModule } from './matchwon-routing.module';

import { MatchwonPage } from './matchwon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchwonPageRoutingModule
  ],
  declarations: [MatchwonPage]
})
export class MatchwonPageModule {}
