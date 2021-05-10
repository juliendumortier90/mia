import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/util/storage/storageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toactivate',
  templateUrl: './toactivate.component.html',
  styleUrls: ['./toactivate.component.css']
})
export class AdminToActivateComponent implements OnInit {

  private readonly isBrowser: boolean = typeof window !== 'undefined';

  constructor(private router: Router) {}
  
  ngOnInit() {}

  goHome() {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl('/');
  }
}
