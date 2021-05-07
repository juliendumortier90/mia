import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/util/storage/dataService';
import { StorageService } from 'src/app/util/storage/storageService';

const FDP = 6

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.items = StorageService.getCartItems()
  }

  deleteFromCart(item) {
    const index = this.items.indexOf(item, 0);
    if (index > -1) {
      this.items.splice(index, 1);
      StorageService.updateAllCartItems(this.items)
    }
  }

  getTotal() {
    return this.items.reduce((a, b) => a + b.price, 0)
  }

  getTotalWithFdp() {
    if (this.items.length == 0) {
      return 0
    }
    return this.getTotal() + FDP
  }

  getFdp() {
    if (this.items.length == 0) {
      return 0
    }
    return FDP
  }
}