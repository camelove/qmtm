import { NgModule } from '@angular/core';
import { RichTextComponent } from './rich-text/rich-text';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [RichTextComponent],
	imports: [
		IonicPageModule.forChild(RichTextComponent),
	],
	exports: [RichTextComponent]
})
export class ComponentsModule {}
