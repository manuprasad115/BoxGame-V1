import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {BoardComponent} from './board.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent,BoardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
