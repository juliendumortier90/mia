import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workshop-register-validation',
  templateUrl: './workshop-register-validation.component.html',
  styleUrls: ['./workshop-register-validation.component.css']
})
export class WorkshopRegisterValidationComponent implements OnInit {

  wsName: string
  wsHash: string

  private readonly isBrowser: boolean = typeof window !== 'undefined';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.wsName = this.route.snapshot.queryParamMap.get('wsName');
    this.wsHash = this.route.snapshot.queryParamMap.get('wsId');
    this.http.get('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/inscriptionEnd?hash='+this.wsHash).subscribe((data: any) => {
        console.log('register added')
      })
  }


  navigate(goto: string) {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl(goto);
  }
}
