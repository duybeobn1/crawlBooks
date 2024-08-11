import { Component, OnInit } from '@angular/core';
import { ReadListService } from './read-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readListCount: number = 0;
  wishListCount: number = 0;

  constructor(private readListService: ReadListService) {}

  ngOnInit() {
    this.readListService.readList$.subscribe(readList => {
      this.readListCount = readList.length;
    });
    this.readListService.wishList$.subscribe(wishList => {
      this.wishListCount = wishList.length;
    });
  }
}
