import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreListPage } from './score-list';

@NgModule({
  declarations: [
    ScoreListPage,
  ],
  imports: [
    IonicPageModule.forChild(ScoreListPage),
  ],
})
export class ScoreListPageModule {}
