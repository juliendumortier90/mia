import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-workshop',
  templateUrl: './add-workshop.component.html',
  styleUrls: ['./add-workshop.component.css']
})
export class AdminAddWorkshopComponent implements OnInit {

  /*
  {
    "visible": "true",
    "name": "workshop toto1",
    "startDate": "01/01/1990",
    "description": "3",
    "nbMax": 4,
    "type": "feraillage"
}
  */
  workshop = {
    name : '',
    startDate : '',
    description : '',
    nbMax : '',
    type : '',
  }

  dateError = false

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  onAddWorkshop() {
    this.dateError = false
    if (10 !== this.workshop.startDate.length || !this.isValidDate(this.workshop.startDate) || !this.isValidNumber(this.workshop.nbMax)) {
      this.dateError = true
    } else {
      this.http.post<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/workshop/add-workshop', this.workshop).subscribe((data: any) => {
        this.router.navigateByUrl('/admin/workshops')
      }, (error: any) => {})
    }
  }
  
  isValidDate(date) {
    // your desired pattern
    var pattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/
    return date.match(pattern)
  }

  isValidNumber(number) {
    // your desired pattern
    var pattern = /^\d+$/
    return number.match(pattern)
  }

  typeChange(type) {
    this.workshop.type = type
  }
}
