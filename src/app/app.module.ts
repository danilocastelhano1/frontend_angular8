import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { ComponentsModule } from './components/components.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  ComponentsModule,
  Ng2SmartTableModule
]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...IMPORTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
