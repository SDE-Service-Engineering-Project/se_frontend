import { ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';

import { HeaderComponent } from './header.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '',
})
class RoutedTestComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [
      NgbCollapseModule,
      RouterTestingModule.withRoutes([
        {
          path: 'cars',
          component: RoutedTestComponent,
        },
        {
          path: 'maps',
          component: RoutedTestComponent,
        },
        {
          path: 'catalog',
          component: RoutedTestComponent,
        },
        {
          path: '',
          component: RoutedTestComponent,
        },
      ]),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should navigate to the correct routes', () => {
    spectator.click(getNavigationItem('cars'));
    spectator.detectChanges();
    expect(spectator.inject(Location).path()).toBe('/cars');
    spectator.click(getNavigationItem('maps'));
    spectator.detectChanges();
    expect(spectator.inject(Location).path()).toBe('/maps');
    spectator.click(getNavigationItem('catalog'));
    spectator.detectChanges();
    expect(spectator.inject(Location).path()).toBe('/catalog');
  });

  //TODO: add expectation of real logout i.e. token was removed, etc.
  it('should log the user out', () => {
    spectator.click(getLogoutNavItem());
    expect(spectator.inject(Location).path()).toBe('/');
  });

  it('should change the collapsed property of the navbar', () => {
    spectator.click(getNavToggleButton());
    expect(component.isNavbarCollapsed).toEqual(true);
  });

  function getNavigationItem(title: string): HTMLButtonElement {
    return spectator.query(byTestId(`nav-item-${title}`)) as HTMLButtonElement;
  }

  function getLogoutNavItem(): HTMLButtonElement {
    return spectator.query(byTestId('nav-logout')) as HTMLButtonElement;
  }

  function getNavToggleButton(): HTMLButtonElement {
    return spectator.query(byTestId('toggle-btn')) as HTMLButtonElement;
  }
});
