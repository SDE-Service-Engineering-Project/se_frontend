import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  isNavbarCollapsed = false;
  navItems = [
    {
      title: 'Catalog',
      path: '/catalog',
      testId: 'nav-item-catalog',
    },
    {
      title: 'Rented Cars',
      path: '/cars',
      testId: 'nav-item-cars',
    },
    {
      title: 'Find a Location',
      path: '/maps',
      testId: 'nav-item-maps',
    },
  ];

  constructor(private storageService: StorageService, private router: Router) {}

  logout(): void {
    this.storageService.removeAll();
    this.router.navigate(['/']);
  }
}
