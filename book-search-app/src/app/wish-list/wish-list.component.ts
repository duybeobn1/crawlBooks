import { Component, OnInit } from '@angular/core';
import { ReadListService } from '../read-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishList: any[] = [];

  constructor(private readListService: ReadListService) {}

  ngOnInit() {
    this.readListService.wishList$.subscribe(wishList => {
      this.wishList = wishList;
    });
  }

  removeFromWishList(book: any) {
    this.readListService.removeFromWishList(book);
  }
}
