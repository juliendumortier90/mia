import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/util/storage/storageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    
  }

  login(user: string, password: string) {
    StorageService.setToken('toto')
    /*this.http.post<any>('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/login', {
      user,
      password
    }).subscribe((data: any[]) => {
      // save to store parameter
      // redirect to admin home
      this.router.navigateByUrl('/admin/home');
    })*/
  }
}
