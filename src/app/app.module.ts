import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './assets/navbar/navbar.component';
import { FooterComponent } from './assets/footer/footer.component';
import { ErrorComponent } from './assets/error/error.component';
import { IndexComponent } from './assets/index/index.component';
import { CreateComponent } from './modulos/vuelos/create/create.component';
import { EditComponent } from './modulos/vuelos/edit/edit.component';
import { GetComponent } from './modulos/vuelos/get/get.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    GetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
