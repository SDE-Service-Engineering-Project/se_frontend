import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  isNavbarCollapsed = false;
  navItems = [
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

  constructor(private router: Router) {}

  logout(): void {
    //TODO: add logic to log user out
    this.router.navigate(['/']);
  }
}