import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndiaMapComponent } from './india-map/india-map.component';
import { HttpClientModule } from '@angular/common/http';
import { StateMapComponent } from './state-map/state-map.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DistrictPageComponent } from './district-page/district-page.component';

@NgModule({
  declarations: [
    AppComponent,
    IndiaMapComponent,
    StateMapComponent,
    HomeComponent,
    AboutUsComponent,
    DistrictPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
