import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/util/popup/confirmation-dialog.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './uorder.component.html',
  styleUrls: ['./uorder.component.css']
})
export class AdminUpdateOrderComponent implements OnInit {

  order : any

  constructor(private confirmationDialogService: ConfirmationDialogService,
                private http: HttpClient,
                private toastr: ToastrService,
                private router: Router) {
  }

  ngOnInit() {
    this.order = window.history.state.order
    console.log(this.order)
  }

  onChangeStatus(status: string) {
    this.confirmationDialogService.confirm('Enregistrer', 'Voulez-vous vraiment changer le statut de la commande ?')
    .then((confirmed) => {
      if(confirmed) {
        this.changeOrderStatus(status)
      }
    })
  }

  onChangeComment() {
    this.confirmationDialogService.confirm('Enregistrer', 'Voulez-vous vraiment modifier le commentaire de la commande ?')
    .then((confirmed) => {
      if(confirmed) {
        this.changeOrderComment(this.order.comment)
      }
    })
  }

  changeOrderStatus(status: string) {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/admin/update-order-status', { id: this.order.id, status: status})
        .subscribe((data: any) => {
          this.toastr.success('Le statut de la commande a été mis à jour')
          this.goBack()
        })
  }

  changeOrderComment(comment: string) {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/admin/update-order-comment', { id: this.order.id, comment: comment} )
        .subscribe((data: any) => {
          this.toastr.success('Le commentaire de la commande a été mis à jour')
          this.goBack()
        })
  }
  
  getFormatedAddress(address): string {
    const values = Object.keys(address).map(key => address[key]);
    return  values.join(" ")
  }

  goBack() {
    this.router.navigateByUrl('/admin/shop-orders')
  }
}
