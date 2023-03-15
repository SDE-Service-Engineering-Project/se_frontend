import {ComponentFixture} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let spectator: Spectator<RegisterComponent>;

  const createComponent = createComponentFactory({
    component: RegisterComponent,
    imports: [HttpClientTestingModule, ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable register button when all fields are correctly set', function () {
    component.registerForm.get('username')?.setValue('username');
    component.registerForm.get('firstname')?.setValue('firstname');
    component.registerForm.get('lastname')?.setValue('lastname');
    component.registerForm.get('password')?.setValue('password');
    component.registerForm.get('confirm_password')?.setValue('password');

    spectator.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('#register-btn').disabled).toBeFalsy();

  });

  // TODO: add register test with mocks and routes
});
