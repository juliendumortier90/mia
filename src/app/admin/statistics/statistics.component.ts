import { Component, PipeTransform, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {

  members = []
  filteredMembers = []
  filter = ''

  members2021 = 0
  members2022 = 0
  male = 0
  female = 0
  femalePercent = 0

  constructor(private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    this.getMembers().subscribe((data: any[]) => {
      this.members = data
      this.members2021 = this.members.filter(member => member.creationDate.indexOf('/2021') >= 0).length
      this.members2022 = this.members.filter(member => member.creationDate.indexOf('/2022') >= 0).length
      this.male = this.members.filter(member => member.sexe?.indexOf('HOMME') >= 0).length
      this.female = this.members.filter(member => member.sexe?.indexOf('FEMME') >= 0).length
      this.femalePercent = this.female *100/(this.male + this.female)
    })
  }

  navigate(goto: string) {
    this.router.navigateByUrl(goto);
  }

  private getMembers(): Observable<any[]> {
    return this.http.get<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/integ/member/list-members')
  }

  downloadMembers() {
    const headers = ["phoneNumber","practice","sexe","lastName","creationDate","email","hasPaid","firstName","isHelloAsso","city","note","dateOfBirth"];
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    let csv = this.members.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    // csv.unshift(headers.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "members.csv");
}
}
