import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadListService {
  private readList = new BehaviorSubject<any[]>(this.getListFromLocalStorage('readList'));
  private wishList = new BehaviorSubject<any[]>(this.getListFromLocalStorage('wishList'));

  readList$ = this.readList.asObservable();
  wishList$ = this.wishList.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private getListFromLocalStorage(key: string): any[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(key) || '[]');
    }
    return [];
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
  }

  removeFromReadList(book: any) {
    const updatedList = this.readList.value.filter(item => item.id !== book.id);
    this.readList.next(updatedList);
    this.updateLocalStorage('readList', updatedList);
  }

  addToWishList(book: any) {
    const updatedList = [...this.wishList.value, book];
    this.wishList.next(updatedList);
    this.updateLocalStorage('wishList', updatedList);
  }

  removeFromWishList(book: any) {
    const updatedList = this.wishList.value.filter(item => item.id !== book.id);
    this.wishList.next(updatedList);
    this.updateLocalStorage('wishList', updatedList);
  }
}
