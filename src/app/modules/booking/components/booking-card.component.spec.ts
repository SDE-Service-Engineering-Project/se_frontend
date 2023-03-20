import { ComponentFixture } from '@angular/core/testing';
import { BookingCardComponent } from './booking-card.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('BookingComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;
  let spectator: Spectator<BookingCardComponent>;

  const createComponent = createComponentFactory({
    component: BookingCardComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
});
