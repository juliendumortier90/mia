import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../util/storage/storageService';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  items = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.updateArticles()
  }

  addToCart(article) {
    StorageService.addCartItem(article)
    // this.router.navigateByUrl('/shop/cart')
  }

  getNbItemInCart(item) {
    const cartItems = StorageService.getCartItems()
    return cartItems.filter(cartItem => cartItem.id == item.id).length
  }

  private updateArticles() {
    this.getArticles().subscribe((data: any[]) => {
      this.items = data
    })
  }

  private getArticles(): Observable<any[]> {
    return this.http.get<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/integ/shop/list-items')
  }
}