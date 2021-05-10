import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/util/storage/storageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {

  private readonly isBrowser: boolean = typeof window !== 'undefined';

  constructor(private router: Router) {}
  
  ngOnInit() {}

  navigate(goto: string) {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl(goto);
  }

  hasRole(role: string) {
    return StorageService.userHasRole(role)
  }
}
