import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workshop-register',
  templateUrl: './workshop-register.component.html',
  styleUrls: ['./workshop-register.component.css']
})
export class WorkshopRegisterComponent implements OnInit {

  wsName: string
  wsId: string
  wsStartDate: string

  item = {
    member: {
      email: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      description: ""
    },
    workshopId: ""
  }

  private readonly isBrowser: boolean = typeof window !== 'undefined';
  inEmailError = false
  inInvitationSend = false
  alreadyUseEmail = false

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.inEmailError = false
    this.alreadyUseEmail = false
  }

  ngOnInit() {
    this.wsName = this.route.snapshot.queryParamMap.get('wsName');
    this.wsId = this.route.snapshot.queryParamMap.get('wsId');
    this.item.workshopId = this.wsId;
    this.wsStartDate = this.route.snapshot.queryParamMap.get('wsStartDate');
  }


  navigate(goto: string) {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl(goto);
  }

  onAddMember() {
    this.inEmailError = false
    this.alreadyUseEmail = false
    if (this.iValidEmail(this.item.member.email) == false) {
      this.inEmailError = true
    } else {
      this.http.post<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/register', this.item).subscribe((data: any) => {
        this.inInvitationSend = true
      }, (error: any) => {
        if (error.status == 410) {
          this.alreadyUseEmail = true
        }
      })
    }
  }

  iValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
