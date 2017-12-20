import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Saran } from './saran';

@NgModule({
  declarations: [
    Saran,
  ],
  imports: [
    IonicPageModule.forChild(Saran),
  ],
})
export class SaranModule {}
