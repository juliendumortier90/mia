import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/util/popup/confirmation-dialog.service';

@Component({
  selector: 'app-update-member',
  templateUrl: './umember.component.html',
  styleUrls: ['./umember.component.css']
})
export class AdminUpdateMemberComponent implements OnInit {

  member : any

  constructor(private confirmationDialogService: ConfirmationDialogService,
                private http: HttpClient,
                private toastr: ToastrService,
                private router: Router) {
  }

  ngOnInit() {
    this.member = window.history.state.member
  }

  onChangePayStatus() {
    this.confirmationDialogService.confirm('Enregistrer', 'Voulez-vous vraiment changer le statut de paiement ?')
    .then((confirmed) => {
      if(confirmed) {
        this.changePayStatusMember()
      }
    })
  }

  changePayStatusMember() {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/member/update-paid', this.member)
        .subscribe((data: any) => {
          this.toastr.success('Le statut de paiement du membre a été mis à jour')
          this.goBack()
        })
  }
  
  goBack() {
    this.router.navigateByUrl('/admin/members')
  }
}
