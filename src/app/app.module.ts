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
import { WorkshopsComponent } from './workshop/workshops.component';
import { AssociationComponent } from './association/association.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NewsComponent } from './news/news.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminAddUserComponent } from './admin/add-user/add-user.component';
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
import { Router } from '@angular/router';
import { AuthInterceptor } from './util/http.interceptor';
import { AdminToActivateComponent } from './admin/toactivate/toactivate.component';
import { AdminMembersComponent } from './admin/members/members.component';
import { AdminUpdateMemberComponent } from './admin/members/update-member/umember.component';
import { AdminAddMemberComponent } from './admin/members/add-member/add-member.component';
import { AdminOrdersComponent } from './admin/orders/orders.component';
import { AdminUpdateOrderComponent } from './admin/orders/update-order/uorder.component';
import { LinksComponent } from './links/links.component';
import { AdminStatisticsComponent } from './admin/statistics/statistics.component';
import { WorkshopRegisterComponent } from './workshop/workshop-register/workshop-register.component';
import { WorkshopRegisterValidationComponent } from './workshop/workshop-register-validation/workshop-register-validation.component';
import { AdminWorkshopsComponent } from './admin/workshops/workshops.component';
import { AdminWorkshopDetailComponent } from './admin/workshops/workshop-detail/workshop-detail.component';
import { AdminAddWorkshopComponent } from './admin/workshops/add-workshop/add-workshop.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    SkateparkComponent,
    ShopComponent,
    WorkshopsComponent,
    WorkshopRegisterComponent,
    WorkshopRegisterValidationComponent,
    NewsComponent,
    AssociationComponent,
    AdminLoginComponent,
    AdminAddUserComponent,
    AdminHomeComponent,
    AdminArticlesComponent,
    AdminArticleComponent,
    ConfirmationDialogComponent,
    CartComponent,
    PaypalComponent,
    PaypalSuccessComponent,
    LinksComponent,
    AdminToActivateComponent,
    AdminMembersComponent,
    AdminUpdateMemberComponent,
    AdminAddMemberComponent,
    AdminOrdersComponent,
    AdminUpdateOrderComponent,
    AdminStatisticsComponent,
    AdminWorkshopsComponent,
    AdminWorkshopDetailComponent,
    AdminAddWorkshopComponent
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
    ToastrModule.forRoot(),
    
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useFactory: function(router: Router) {
      return new AuthInterceptor(router)
    },
    multi: true,
    deps: [Router]
 }, ConfirmationDialogService, DataService ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AppModule { }
