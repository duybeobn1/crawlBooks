import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReadListService } from '../read-list.service';
import { AppwriteService } from '../appwrite.service';  // Import AppwriteService

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.component.html',
  styleUrls: ['./read-list.component.css']
})
export class ReadListComponent implements OnInit {
  readList: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readListService: ReadListService,
    private appwriteService: AppwriteService  // Inject AppwriteService
  ) {}

  ngOnInit() {
    this.readListService.readList$.subscribe(readList => {
      this.readList = readList;
    });

    this.loadReadList();
  }

  loadReadList() {
    if (isPlatformBrowser(this.platformId)) {
      this.appwriteService.getCurrentUser().then(user => {
        this.readListService.getBooksByUser(user.$id);
      });
    }
  }

  removeFromReadList(book: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.appwriteService.deleteBook(book.$id).then(() => {
        this.loadReadList();  // Reload the list from the database to ensure it’s up-to-date
      }).catch(error => {
        console.error('Error removing book from read list:', error);
      });
    }
  }
}
