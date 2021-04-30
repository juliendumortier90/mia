import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/util/storage/storageService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    
  }

  logout() {
    StorageService.setToken("")
  }
}
