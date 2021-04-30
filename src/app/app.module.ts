import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavComponent } from './topnav/topnav.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from "@angular/common";
import { SkateparkComponent } from './skatepark/skatepark.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { AssociationComponent } from './association/association.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NewsComponent } from './news/news.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    SkateparkComponent,
    ShopComponent,
    ContactComponent,
    NewsComponent,
    AssociationComponent,
    AdminLoginComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxScrollTopModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
