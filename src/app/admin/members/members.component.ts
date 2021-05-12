import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class AdminMembersComponent implements OnInit {

  members = []

  constructor(private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    this.updateMembers()
  }

  private updateMembers() {
    this.getMembers().subscribe((data: any[]) => {
      this.members = data
    })
  }

  private getMembers(): Observable<any[]> {
    return this.http.get<any>('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/member/list-members')
  }

  addMember() {
    this.router.navigateByUrl('/admin/add-member')
  }
}
