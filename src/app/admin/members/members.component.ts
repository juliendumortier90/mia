import { Component, PipeTransform, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class AdminMembersComponent implements OnInit {

  members = []
  filteredMembers = []
  filter = ''

  constructor(private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    this.updateMembers()
  }

  private updateMembers() {
    this.getMembers().subscribe((data: any[]) => {
      this.members = data
      this.updateFilteredMembers()
      console.log(new Date(this.members[0].creationDate))
    })
  }

  formatDate(date: string) {
    var parts = date.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]).getTime(); 
  }

  private getMembers(): Observable<any[]> {
    return this.http.get<any>('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/member/list-members')
  }

  hasEmail(mail): boolean {
    return !JSON.stringify(mail).includes('sansmail')
  }

  updateFilteredMembers() {
    if (this.filter == '') {
      this.filteredMembers = this.members.sort((m1, m2) => this.formatDate(m2.creationDate) - this.formatDate(m1.creationDate))
    } else {
      this.filteredMembers = this.members.filter(member => 
        JSON.stringify(member).toLowerCase().includes(this.filter.toLowerCase())
      ).sort((m1, m2) => this.formatDate(m2.creationDate) - this.formatDate(m1.creationDate))
    }
  }

  memberDetail(member: any) {
    this.router.navigateByUrl('/admin/update-member', { state: {member: member}})
  }

  addMember() {
    this.router.navigateByUrl('/admin/add-member')
  }

  statistics() {
    this.router.navigateByUrl('/admin/statistics')
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
