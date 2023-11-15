import { Component, PipeTransform, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class AdminWorkshopsComponent implements OnInit {

  /*
    {
        "visible": true,
        "endDate": "1990-01-01T01:00",
        "members": [],
        "startDate": "1990-01-01T01:00",
        "description": "3",
        "id": "bkhezy58yqm",
        "name": "workshop 1",
        "nbMax": 4,
        "type": "feraillage"
    }
  */
  workshops = []

  constructor(private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    this.getWorkshops()
  }

  private getWorkshops() {
    this.http.get<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/list-items').subscribe((data: any[]) => {
      this.workshops = data
    })
  }

  addWorkshop() {
    this.router.navigateByUrl('/admin/add-workshop')
  }

  workshopDetail(ws: any) {
    this.router.navigateByUrl('/admin/workshop/detail', { state: {ws: ws}})
  }
}
