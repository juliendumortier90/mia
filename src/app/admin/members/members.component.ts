import { Component, PipeTransform, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

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
    })
  }

  private getMembers(): Observable<any[]> {
    return this.http.get<any>('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/member/list-members')
  }

  updateFilteredMembers() {
    this.filteredMembers = this.members.filter(member => 
      JSON.stringify(member).includes(this.filter)
    )
  }

  memberDetail(member: any) {
    this.router.navigateByUrl('/admin/update-member', { state: {member: member}})
  }

  addMember() {
    this.router.navigateByUrl('/admin/add-member')
  }
}
