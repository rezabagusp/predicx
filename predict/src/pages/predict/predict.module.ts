import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PredictPage } from './predict';

@NgModule({
  declarations: [
    PredictPage,
  ],
  imports: [
    IonicPageModule.forChild(PredictPage),
  ],
})
export class PredictPageModule {}
