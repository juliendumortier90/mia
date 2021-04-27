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

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    SkateparkComponent,
    ShopComponent,
    ContactComponent,
    NewsComponent,
    AssociationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxScrollTopModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
