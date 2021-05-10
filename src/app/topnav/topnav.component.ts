import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../util/storage/storageService';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopNavComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  private readonly isBrowser: boolean = typeof window !== 'undefined';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isCurrentRoute(route: string) {
    return this.router.url === route;
  }

  isLoggedIn() {
    return StorageService.isLoggedIn()
  }

  logout() {
    StorageService.clearTokenAndRoles()
    this.navigate("/")
  }

  getNbItemInCart() {
    return StorageService.getCartItems().length
  }

  navigate(goto: string) {
    if (this.isBrowser) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
    }
    this.router.navigateByUrl(goto);
  }
}
