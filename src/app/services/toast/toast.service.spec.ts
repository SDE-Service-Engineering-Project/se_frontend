import { ToastInfo, ToastService } from './toast.service';
import { createServiceFactory } from '@ngneat/spectator';

describe('ToastService', () => {
  let spectator: any;
  let toast: ToastInfo = {
    text: 'this is a test toast',
    classname: 'bg-success',
    body: 'this is a test body',
    delay: 1,
  };

  const createService = createServiceFactory(ToastService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should push a specific toast to the toasts array', () => {
    spectator.service.show(toast);
    expect(spectator.service.toasts.length).toEqual(1);
  });
});
