import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReadListService } from '../read-list.service';
import { AppwriteService } from '../appwrite.service';  // Import AppwriteService

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishList: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readListService: ReadListService,
    private appwriteService: AppwriteService  // Inject AppwriteService
  ) {}

  ngOnInit() {
    this.readListService.wishList$.subscribe(wishList => {
      this.wishList = wishList;
    });

    this.loadWishList();
  }

  loadWishList() {
    if (isPlatformBrowser(this.platformId)) {
      this.appwriteService.getCurrentUser().then(user => {
        this.readListService.getBooksByUser(user.$id);
      });
    }
  }

  removeFromWishList(book: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.appwriteService.deleteBook(book.$id).then(() => {
        this.loadWishList();  // Reload the list from the database to ensure it’s up-to-date
      }).catch(error => {
        console.error('Error removing book from wish list:', error);
      });
    }
  }
  
}
