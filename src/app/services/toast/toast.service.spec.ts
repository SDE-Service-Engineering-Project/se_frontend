import { ToastInfo, ToastService } from './toast.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { getNsPrefix } from '@angular/compiler';

describe('ToastService', () => {
  let spectator: SpectatorService<ToastService>;
  let toast: ToastInfo = {
    text: 'this is a test toast',
    classname: 'bg-success',
    body: 'this is a test body',
    delay: 1,
  };

  const createService = createServiceFactory({
    service: ToastService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should push a toast to the toasts array', () => {
    spectator.service.show(toast.text);
    expect(spectator.service.toasts.length).toEqual(1);
  });

  it('should remove a toast from array', () => {
    spectator.service.show(toast.text, {
      classname: 'bg-success',
      body: 'this is a test body',
      delay: 1,
    });
    spectator.service.remove(spectator.service.toasts[0]);
    expect(spectator.service.toasts.length).toEqual(0);
  });
});
