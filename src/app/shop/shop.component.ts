import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  items = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateArticles()
  }

  private updateArticles() {
    this.getArticles().subscribe((data: any[]) => {
      this.items = data
    })
  }

  private getArticles(): Observable<any[]> {
    return this.http.get<any>('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/list-items')
  }
}