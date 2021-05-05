import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminArticleComponent } from './admin/articles/article/article.component';
import { AdminArticlesComponent } from './admin/articles/articles.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { AssociationComponent } from './association/association.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { CartComponent } from './shop/cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { SkateparkComponent } from './skatepark/skatepark.component';
import { IsLoggedInGuard } from './util/guard/isLoggedInQuard';

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
        path: 'partenaire',
        component: PartenaireComponent
    },
    {
        path: 'shop',
        component: ShopComponent
    },
    {
        path: 'shop/cart',
        component: CartComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'admin/login',
        component: AdminLoginComponent
    },
    {
        path: 'admin/home',
        component: AdminHomeComponent,
        canActivate: [
            IsLoggedInGuard
        ]
    },
    {
        path: 'admin/articles',
        component: AdminArticlesComponent,
        canActivate: [
            IsLoggedInGuard
        ]
    },
    {
        path: 'admin/article',
        component: AdminArticleComponent,
        canActivate: [
            IsLoggedInGuard
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
