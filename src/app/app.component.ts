import {Component} from '@angular/core';
import {ACCESS_TOKEN, StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'CarRental';


  constructor(private storageService: StorageService) {
  }

  isLoggedIn() {
    return !!this.storageService.getItem(ACCESS_TOKEN)
  }
}
