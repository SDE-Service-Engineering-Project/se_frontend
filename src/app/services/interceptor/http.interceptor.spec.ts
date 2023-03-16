import {createServiceFactory, SpectatorService} from "@ngneat/spectator";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpInterceptor} from "./http.interceptor";
import {TestBed} from "@angular/core/testing";

describe('HttpInterceptor', () => {
  let spectator: SpectatorService<HttpInterceptor>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: HttpInterceptor,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpClient = spectator.inject<HttpClient>(HttpClient);
    httpTestingController = spectator.inject<HttpTestingController>(
      HttpTestingController
    );
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor: HttpInterceptor = TestBed.inject(HttpInterceptor);
    expect(interceptor).toBeTruthy();
  });


});
