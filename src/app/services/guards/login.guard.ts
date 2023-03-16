import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ACCESS_TOKEN, StorageService} from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  constructor(private storageService: StorageService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.storageService.getItem(ACCESS_TOKEN)) {
      this.router.navigate(['home'])
      return false;
    }

    return true;
  }

}
