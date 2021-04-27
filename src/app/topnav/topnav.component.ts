import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopNavComponent implements OnInit {

  private readonly isBrowser: boolean = typeof window !== 'undefined';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isCurrentRoute(route: string) {
    return this.router.url.startsWith(route);
  }

  navigate(goto: string) {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl(goto);
  }
}
