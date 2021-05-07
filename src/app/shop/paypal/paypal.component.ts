import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    ICreateOrderRequest
} from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/util/storage/storageService';
import { FDP } from '../cart/cart.component';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  payPalConfig: any
  items: any[] = []

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.items = StorageService.getCartItems()
    this.checkStock().subscribe((data: any) => {
      if (data.stock === 'ok') {
        this.initPaypal()
      } else {
        StorageService.clearCardItems()
        this.router.navigateByUrl('shop')
        this.toastr.error("Quelqu'un a déjà acheté un de tes articles, nous t'invitons à recommencer")
      }
    })
  }
  
  initPaypal() {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'ARkJXyaiP9QAJpk2A235mcCBPPv5z2TzeGzX2C26oGgqsSPA-RuHxPU73cwyQolaDnOzZCUYompaIfmz',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.getTotalWithFdp(),
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.getTotal()
                },
                shipping: {
                  currency_code: 'EUR',
                  value: JSON.stringify(FDP)
                }
              }
            },
            items: this.makePaypalItems()
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - get full order details: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.callOnCompleteTransaction(data)
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        this.toastr.error("Erreur durant le processus de paiement")
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  makePaypalItems() {
    const paypalItems = []
    for (let item of this.items) {
      const paypalItem = {
        name: item.name,
        quantity: '1',
        description: item.id,
        category: 'PHYSICAL_GOODS',
        unit_amount: {
          currency_code: 'EUR',
          value: item.price,
        },
      }
      paypalItems.push(paypalItem)
    }
    return paypalItems
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

  private checkStock() {
    const itemsId = this.items.map(item => item.id)
    return this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/check-stock', itemsId)
  }

  private callOnCompleteTransaction(data: any) {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/oncomplete-transaction', data)
        .subscribe((data: any) => {
          this.toastr.success("Paiement réussi")
          this.router.navigateByUrl('/shop/success')
        })
  }
}