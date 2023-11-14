import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders = []
  filteredOrders = []
  filter = ''

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.updateOrders()
  }

  updateFilteredOrders() {
    if (this.filter == '') {
      this.filteredOrders = this.orders
    } else {
      this.filteredOrders = this.orders.filter(order => 
        JSON.stringify(order).toLowerCase().includes(this.filter.toLowerCase())
      )
    }
  }

  orderDetail(order: any) {
    this.router.navigateByUrl('/admin/update-order', { state: {order: order}})
  }

  private updateOrders() {
    this.getOrders().subscribe((data: any[]) => {
      this.orders = data
      this.updateFilteredOrders()
    })
  }

  private getOrders(): Observable<any[]> {
    return this.http.get<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/integ/admin/list-shop-orders')
  }
}
