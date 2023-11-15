import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/util/popup/confirmation-dialog.service';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.css']
})
export class AdminWorkshopDetailComponent implements OnInit {

  ws : any
  constructor(private confirmationDialogService: ConfirmationDialogService,
                private http: HttpClient,
                private toastr: ToastrService,
                private router: Router) {
  }

  ngOnInit() {
    this.ws = window.history.state.ws
  }

  onChangeVisibilityStatus() {
    this.confirmationDialogService.confirm('Enregistrer', 'Voulez-vous vraiment changer la visibilité du workshop ?')
    .then((confirmed) => {
      if(confirmed) {
        this.changeVisibilityStatusWs()
      }
    })
  }

  invite(member) {
    this.confirmationDialogService.confirm('Inviter', 'Voulez-vous vraiment inviter cet utilisateur au workshop ?')
    .then((confirmed) => {
      if(confirmed) {
        this.http.post('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/member/invite', {
            "email": member.email,
            "ws": this.ws.id
        })
        .subscribe((data: any) => {
          this.toastr.success("l'utilisateur a été invité")
          this.goBack()
        })
      }
    })
  }

  refuse(member) {
    this.confirmationDialogService.confirm('Refuser', "Voulez-vous vraiment indiquer à l'utilisateur qu'il n'est pas sélectionné ?")
    .then((confirmed) => {
      if(confirmed) {
        this.http.post('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/member/refuse', {
            "email": member.email,
            "ws": this.ws.id
        })
        .subscribe((data: any) => {
          this.toastr.success("l'utilisateur a été notifié")
          this.goBack()
        })
      }
    })
  }

  changeVisibilityStatusWs() {
    this.http.post('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/visibility', {
            "id": this.ws.id
        })
        .subscribe((data: any) => {
          this.toastr.success("La visibilité de l'atelier a été mise à jour")
          this.goBack()
        })
  }
  
  goBack() {
    this.router.navigateByUrl('/admin/workshops')
  }
}
