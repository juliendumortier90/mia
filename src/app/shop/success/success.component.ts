import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/util/storage/storageService';

@Component({
  selector: 'app-paypalsuccess',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class PaypalSuccessComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    StorageService.clearCardItems()
  }
  
  goShop() {
    this.router.navigateByUrl('/shop')
  }
}