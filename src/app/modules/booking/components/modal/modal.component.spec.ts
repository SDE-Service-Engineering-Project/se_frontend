import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let spectator: Spectator<ModalComponent>;
  let modal: NgbActiveModal;
  let modalSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: ModalComponent,
    providers: [NgbActiveModal],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;

    modal = spectator.inject(NgbActiveModal);
  });

  it('should render the component', () => {
    expect(fixture.debugElement).toMatchSnapshot();
  });

  it('should dismiss the modal on close button click with the reason canceled', () => {
    modalSpy = jest.spyOn(modal, 'dismiss');
    getCloseBtn().click();
    spectator.detectChanges();
    expect(modalSpy).toHaveBeenCalledWith('canceled');
  });

  it('should dismiss the modal on cancel button click with the reason canceled', () => {
    modalSpy = jest.spyOn(modal, 'dismiss');
    getCancelBtn().click();
    spectator.detectChanges();
    expect(modalSpy).toHaveBeenCalledWith('canceled');
  });
  it('should close the modal on confirm button click with the reason confirmed', () => {
    modalSpy = jest.spyOn(modal, 'close');
    getConfirmBtn().click();
    spectator.detectChanges();
    expect(modalSpy).toHaveBeenCalledWith('confirmed');
  });

  function getCloseBtn(): HTMLButtonElement {
    return spectator.query(byTestId('modal-close-btn')) as HTMLButtonElement;
  }
  function getCancelBtn(): HTMLButtonElement {
    return spectator.query(byTestId('modal-cancel-btn')) as HTMLButtonElement;
  }
  function getConfirmBtn(): HTMLButtonElement {
    return spectator.query(byTestId('modal-confirm-btn')) as HTMLButtonElement;
  }
});
