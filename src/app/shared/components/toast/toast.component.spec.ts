import { ComponentFixture } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { ToastService } from '../../../services/toast/toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let spectator: Spectator<ToastComponent>;

  const createComponent = createComponentFactory({
    component: ToastComponent,
    providers: [ToastService],
    imports: [NgbToast],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
  });

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });
});
