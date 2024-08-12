import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppwriteService } from './appwrite.service';

@Injectable({
  providedIn: 'root'
})
export class ReadListService {
  private readList = new BehaviorSubject<any[]>([]);
  private wishList = new BehaviorSubject<any[]>([]);

  readList$ = this.readList.asObservable();
  wishList$ = this.wishList.asObservable();

  readListUpdated$ = new Subject<void>();
  wishListUpdated$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private appwriteService: AppwriteService
  ) {}

  getBooksByUser(userId: string): Promise<void> {
    return this.appwriteService.getBooksByUser(userId).then(response => {
      const books = response.documents;
      const readList = books.filter(book => book['listType'] === 'read');
      const wishList = books.filter(book => book['listType'] === 'wish');

      this.readList.next(readList);
      this.wishList.next(wishList);

      // Optionally, update local storage
      this.updateLocalStorage('readList', readList);
      this.updateLocalStorage('wishList', wishList);

      this.readListUpdated$.next(); // Emit the event for read list update
      this.wishListUpdated$.next(); // Emit the event for wish list update
    }).catch(error => {
      console.error('Error fetching books by user:', error);
    });
  }

  private updateLocalStorage(key: string, list: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(list));
    }
  }

  getReadList(): any[] {
    return this.readList.value;
  }

  getWishList(): any[] {
    return this.wishList.value;
  }

  addToReadList(book: any) {
    const updatedList = [...this.readList.value, book];
    this.readList.next(updatedList);
    this.updateLocalStorage('readList', updatedList);
    this.readListUpdated$.next(); // Emit event
  }

  removeFromReadList(book: any) {
    const updatedList = this.readList.value.filter(item => item.id !== book.id);
    this.readList.next(updatedList);
    this.updateLocalStorage('readList', updatedList);
    this.readListUpdated$.next(); // Emit event
  }

  addToWishList(book: any) {
    const updatedList = [...this.wishList.value, book];
    this.wishList.next(updatedList);
    this.updateLocalStorage('wishList', updatedList);
    this.wishListUpdated$.next(); // Emit event
  }

  removeFromWishList(book: any) {
    const updatedList = this.wishList.value.filter(item => item.id !== book.id);
    this.wishList.next(updatedList);
    this.updateLocalStorage('wishList', updatedList);
    this.wishListUpdated$.next(); // Emit event
  }
}
