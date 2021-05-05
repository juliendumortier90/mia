import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  cartItems: any[];

  constructor() {
      this.cartItems = []
   }
}