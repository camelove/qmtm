import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PrincipalProvider } from '../providers/principal/principal';
import { AppEventsProvider } from '../services/app-events';
import { ScoreDetailPage} from '../pages/score-detail/score-detail';

import { ExamDetailPage}  from '../pages/exam-detail/exam-detail';
import { EtestPage } from '../pages/etest/etest';
import { AdminTabsPage } from '../pages/admin-tabs/admin-tabs';
import { MultistatPage } from '../pages/multistat/multistat';
import { MenuPage }   from '../pages/menu/menu';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    MyApp,
    ScoreDetailPage,
    ExamDetailPage,
    EtestPage,
    AdminTabsPage,
    MultistatPage,
    MenuPage
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScoreDetailPage,
    ExamDetailPage,
    EtestPage,
    AdminTabsPage,
    MultistatPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PrincipalProvider,
    AppEventsProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
