import { Component, Input } from '@angular/core';
import { AppwriteService } from '../appwrite.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() readListCount: number = 0;
  @Input() wishListCount: number = 0;
  user: any;

  constructor(private appwriteService: AppwriteService, library: FaIconLibrary) {
    library.addIcons(faGoogle);  // Add Google icon to the library
  }

  ngOnInit() {
    this.appwriteService.getCurrentUser().then(user => {
      this.user = user;
    }).catch(() => {
      this.user = null;
    });
  }

  login() {
    this.appwriteService.loginWithGoogle();
  }

  logout() {
    this.appwriteService.logout().then(() => {
      this.user = null;
    });
  }
}
