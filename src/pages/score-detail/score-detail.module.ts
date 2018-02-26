import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreDetailPage } from './score-detail';

@NgModule({
  declarations: [
    ScoreDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ScoreDetailPage),
  ],
})
export class ScoreDetailPageModule {}
