import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAddUserComponent } from './admin/add-user/add-user.component';
// import { AdminArticleComponent } from './admin/articles/article/article.component';
// import { AdminArticlesComponent } from './admin/articles/articles.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminAddMemberComponent } from './admin/members/add-member/add-member.component';
import { AdminMembersComponent } from './admin/members/members.component';
import { AdminUpdateMemberComponent } from './admin/members/update-member/umember.component';
// import { AdminOrdersComponent } from './admin/orders/orders.component';
// import { AdminUpdateOrderComponent } from './admin/orders/update-order/uorder.component';
import { AdminToActivateComponent } from './admin/toactivate/toactivate.component';
import { AssociationComponent } from './association/association.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { LinksComponent } from './links/links.component';
// import { CartComponent } from './shop/cart/cart.component';
// import { PaypalComponent } from './shop/paypal/paypal.component';
import { WorkshopsComponent } from './workshop/workshops.component';
import { ShopComponent } from './shop/shop.component';
import { PaypalSuccessComponent } from './shop/success/success.component';
import { SkateparkComponent } from './skatepark/skatepark.component';
import { HasRoleGuard } from './util/guard/hasRoleGuard';
import { AdminStatisticsComponent } from './admin/statistics/statistics.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'news',
        component: NewsComponent
    },
    {
        path: 'skatepark',
        component: SkateparkComponent
    },
    {
        path: 'association',
        component: AssociationComponent
    },
    {
        path: 'workshops',
        component: WorkshopsComponent
    },
    {
        path: 'partenaire',
        component: PartenaireComponent
    },
    {
        path: 'shop',
        component: ShopComponent
    },
    {
        path: 'links',
        component: LinksComponent
    },
    /*
    {
        path: 'shop/cart',
        component: CartComponent
    },
    {
        path: 'shop/paypal',
        component: PaypalComponent
    },*/
    {
        path: 'shop/success',
        component: PaypalSuccessComponent
    },
    {
        path: 'admin/login',
        component: AdminLoginComponent
    },
    {
        path: 'admin/add-user',
        component: AdminAddUserComponent
    },
    {
        path: 'admin/toactivate',
        component: AdminToActivateComponent
    },
    {
        path: 'admin/home',
        component: AdminHomeComponent,
        canActivate: [
            HasRoleGuard
        ]
    },
    {
        path: 'admin/members',
        component: AdminMembersComponent,
        canActivate: [
            HasRoleGuard
        ]
    },
    {
        path: 'admin/statistics',
        component: AdminStatisticsComponent
    },
    {
        path: 'admin/update-member',
        component: AdminUpdateMemberComponent,
        canActivate: [
            HasRoleGuard
        ]
    },
    {
        path: 'admin/add-member',
        component: AdminAddMemberComponent,
        canActivate: [
            HasRoleGuard
        ]
    },/*
    {
        path: 'admin/articles',
        component: AdminArticlesComponent,
        canActivate: [
            HasRoleGuard
        ]
    },
    {
        path: 'admin/article',
        component: AdminArticleComponent,
        canActivate: [
            HasRoleGuard
        ]
    },
    {
        path: 'admin/shop-orders',
        component: AdminOrdersComponent,
        canActivate: [
            HasRoleGuard
        ]
    },
    {
        path: 'admin/update-order',
        component: AdminUpdateOrderComponent,
        canActivate: [
            HasRoleGuard
        ]
    }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
