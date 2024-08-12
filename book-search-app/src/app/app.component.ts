import { Component, OnInit } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { ReadListService } from './read-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: any;
  readListCount: number = 0;
  wishListCount: number = 0;

  constructor(
    private appwriteService: AppwriteService,
    private readListService: ReadListService
  ) {}

  ngOnInit() {
    // Authenticate the user and get their information
    this.appwriteService.getCurrentUser().then((user) => {
      this.user = user;

      // Fetch initial counts and update when lists are changed
      this.readListService.getBooksByUser(user.$id).then(() => {
        this.updateCounts();
      });

      // Subscribe to the read list and wish list to update the counts dynamically
      this.readListService.readListUpdated$.subscribe(() => {
        this.updateCounts();
      });

      this.readListService.wishListUpdated$.subscribe(() => {
        this.updateCounts();
      });
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
      this.readListCount = 0;
      this.wishListCount = 0;
    });
  }

  private updateCounts() {
    this.readListCount = this.readListService.getReadList().length;
    this.wishListCount = this.readListService.getWishList().length;
  }
}
