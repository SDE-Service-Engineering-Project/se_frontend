import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from './shared/components/header/header.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const createComponent = createComponentFactory({
    detectChanges: false,
    component: AppComponent,
    imports: [RouterTestingModule, MockComponent(HeaderComponent)],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should render the app', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it(`should display login page`, () => {
    expect(component.title).toEqual('CarRental');
  });
});
