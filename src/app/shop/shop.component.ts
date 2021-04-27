import { Component, OnInit } from '@angular/core';
import { SHOP_ITEMS } from './shopItems.mock';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  items = SHOP_ITEMS;

  ngOnInit() {

  }
}

export interface ShopItem {
  id: string,
  b64picture1: string,
  b64picture2: string,
  b64picture3: string,
  b64picture4: string,
  title: string,
  price: number,
  type: string,
  uniq: boolean,
  occasion: boolean,
  customisable: boolean
}
