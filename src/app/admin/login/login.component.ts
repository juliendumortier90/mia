import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { StorageService } from 'src/app/util/storage/storageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {

  login = ''
  password = ''
  onError = false

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.onError = false
  }

  onLogin() {
    StorageService.clearTokenAndRoles()
    const md5 = Md5.hashStr(this.password)
    this.http.post<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/integ/admin/login', {
      login: this.login,
      password: md5
    }).subscribe((data: any) => {
      this.onError = false
      // save to store parameter
      StorageService.setToken(data.token)
      StorageService.setRoles(data.roles)
      // redirect to admin home
      this.router.navigateByUrl('/admin/home');
    }, (error: any) => {
      if (error.status == 433) {
        this.router.navigateByUrl('/admin/toactivate')
      } else {
        this.onError = true
      }
    })
  }

  isValidLogin() {
    return this.login.length > 4 && this.password.length > 4
  }
}
