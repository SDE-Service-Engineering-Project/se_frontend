import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // we just check if there is a token present
    // in future we could validate the expiry date
    if (!!this.storageService.getItem(ACCESS_TOKEN)) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
