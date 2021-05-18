import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AdminAddMemberComponent implements OnInit {

  member = {
    email : '',
    firstName : '',
    lastName : '',
    phoneNumber : '',
    address : '',
    postalCode : '',
    city : '',
    dateOfBirth : '',
    practice : '',
    isHelloAsso : false,
    hasPaid : false
  }
  inEmailError = false
  alreadyUseEmail = false
  dateError = false
  otherError = false

  constructor(private http: HttpClient, private router: Router) {
    this.inEmailError = false
    this.alreadyUseEmail = false
    this.otherError = false
    this.dateError = false
  }

  ngOnInit() {
  }

  onAddMember() {
    this.inEmailError = false
    this.alreadyUseEmail = false
    this.otherError = false
    this.dateError = false
    if (10 !== this.member.dateOfBirth.length || !this.isValidDate(this.member.dateOfBirth)) {
      this.dateError = true
    } else if (this.iValidEmail(this.member.email) == false) {
      this.inEmailError = true
    } else {
      this.http.post<any>('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/member/add-member', this.member).subscribe((data: any) => {
        this.router.navigateByUrl('/admin/members')
      }, (error: any) => {
        if (error.status == 410) {
          this.alreadyUseEmail = true
        } else {
          this.otherError = true
        }
      })
    }
  }
  
  isValidDate(date) {
    if (date.length == 0)
      return true
    // your desired pattern
    var pattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/
    return date.match(pattern)
  }

  iValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  practiceChange(practice) {
    this.member.practice = practice
  }
}
