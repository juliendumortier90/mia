import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavComponent } from './topnav/topnav.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from "@angular/common";
import { SkateparkComponent } from './skatepark/skatepark.component';
import { ShopComponent } from './shop/shop.component';
import { AssociationComponent } from './association/association.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NewsComponent } from './news/news.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminArticlesComponent } from './admin/articles/articles.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminArticleComponent } from './admin/articles/article/article.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './util/popup/confirmation-dialog.component';
import { ConfirmationDialogService } from './util/popup/confirmation-dialog.service';
import { DataService } from './util/storage/dataService';
import { CartComponent } from './shop/cart/cart.component';
import { PaypalComponent } from './shop/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalSuccessComponent } from './shop/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    SkateparkComponent,
    ShopComponent,
    NewsComponent,
    AssociationComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminArticlesComponent,
    AdminArticleComponent,
    ConfirmationDialogComponent,
    CartComponent,
    PaypalComponent,
    PaypalSuccessComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxScrollTopModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxPayPalModule,
    ToastrModule.forRoot()
  ],
  providers: [ ConfirmationDialogService, DataService ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AppModule { }
