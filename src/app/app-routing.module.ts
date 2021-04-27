import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociationComponent } from './association/association.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { ShopComponent } from './shop/shop.component';
import { SkateparkComponent } from './skatepark/skatepark.component';

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
        path: 'contact',
        component: ContactComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
