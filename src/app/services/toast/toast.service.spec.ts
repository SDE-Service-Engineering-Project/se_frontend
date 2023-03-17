import { ToastInfo, ToastService } from './toast.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

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

  it('should remove all toasts from array', () => {
    spectator.service.show(toast.text, {
      classname: 'bg-success',
      body: 'this is a test body',
      delay: 1,
    });
    spectator.service.show(toast.text, {
      classname: 'bg-success',
      body: 'this is a test body',
      delay: 1,
    });
    spectator.service.removeAll();
    expect(spectator.service.toasts.length).toEqual(0);
  });

  it('should show a success toast', () => {
    spectator.service.showDefaultSuccessToast(toast.text);
    expect(spectator.service.toasts.length).toEqual(1);
  });

  it('should show an error toast', () => {
    spectator.service.showDefaultErrorToast(toast.text);
    expect(spectator.service.toasts.length).toEqual(1);
  });

  it('should show an error toast with default message', () => {
    spectator.service.showDefaultErrorToast('');
    expect(spectator.service.toasts[0].text).toEqual("Something went wrong");
  });
});
