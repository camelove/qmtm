import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { CKEditorModule } from 'ng2-ckeditor';
// import { RichTextComponent } from './rich-text';

// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    // BrowserModule,
    ReactiveFormsModule 
  ],
})
export class LoginPageModule {}
