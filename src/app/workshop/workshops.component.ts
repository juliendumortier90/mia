import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface Workshop {
  "visible": boolean,
  "endDate": string,
  "members": [],
  "startDate": string,
  "description": string,
  "id": string,
  "name": string,
  "nbMax": number
}

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  items: Workshop[] = [];
  private readonly isBrowser: boolean = typeof window !== 'undefined';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getWorkshops()
  }

  private getWorkshops() {
    this.callGetWorkshops().subscribe((data: Workshop[]) => {
      this.items = data
    })
  }

  private callGetWorkshops(): Observable<Workshop[]> {
    return this.http.get<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/public-list-items')
  }

  navigate(goto: string) {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl(goto);
  }
}