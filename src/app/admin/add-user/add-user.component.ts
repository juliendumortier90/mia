import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  login = ''
  password = ''
  password2 = ''
  inError = false
  alreadyUseEmail = false

  constructor(private http: HttpClient, private router: Router) {
    this.inError = false
    this.alreadyUseEmail = false
  }

  ngOnInit() {
  }

  onAddUser() {
    console.log(this.login)
    console.log(this.password)
    if (this.isValidLogin() == false) {
      this.inError = true
    } else {
      const md5 = Md5.hashStr(this.password)
      this.http.post<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/prod/admin/add-user', {
        login: this.login,
        password: this.password,
        passwordMd5: md5
      }).subscribe((data: any) => {
        this.inError = false
        this.alreadyUseEmail = false
        this.router.navigateByUrl('/admin/toactivate')
      }, (error: any) => {
        if (error.status == 410) {
          this.alreadyUseEmail = true
        } else {
          this.inError = true
        }
      })
    }
  }

  isValidLogin() {
    return this.login.length > 4 && this.password.length > 4
  }

  passwordConfError() {
    if (this.password2.length == 0) {
      return false
    }
    return this.password != this.password2
  }
}
