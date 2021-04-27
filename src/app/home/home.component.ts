import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly isBrowser: boolean = typeof window !== 'undefined';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(goto: string) {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl(goto);
  }
}
