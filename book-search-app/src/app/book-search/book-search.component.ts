import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { ReadListService } from '../read-list.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  bookTitle: string = '';
  authorName: string = '';
  books: any[] = [];

  constructor(private bookService: BookService, private readListService: ReadListService) {}

  searchBooks() {
    this.bookService.searchBooks(this.bookTitle, this.authorName).subscribe(data => {
      this.books = data.items;
    });
  }

  addToReadList(book: any) {
    this.readListService.addToReadList(book);
  }

  addToWishList(book: any) {
    this.readListService.addToWishList(book);
  }
}
