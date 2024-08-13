import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { AppwriteService } from '../appwrite.service';
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

  constructor(
    private bookService: BookService,
    private appwriteService: AppwriteService,
    private readListService: ReadListService
    
  ) {}

  searchBooks() {
    this.bookService.searchBooks(this.bookTitle, this.authorName).subscribe(data => {
      this.books = data.items;
    });
  }
  
  addToReadList(book: any) {
    this.appwriteService.getCurrentUser().then(user => {
      const bookData = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
        description: book.volumeInfo.description || 'No Description',
        imageUrl: book.volumeInfo.imageLinks?.thumbnail || '', 
        averageRating: book.volumeInfo.averageRating?.toString() || 'No rating',
        pageCount: book.volumeInfo.pageCount?.toString() || 'N/A',
        publishedDate: book.volumeInfo.publishedDate || 'Unknown Date',
        previewLink: book.volumeInfo.previewLink || '',
        listType: 'read',
        userId: user.$id,
      };
      this.appwriteService.createBook(bookData).then(() => {
        console.log('Book added to read list');
        this.readListService.addToReadList(bookData);  // Update the service with the new book
      }).catch(error => {
        console.error('Error adding book to read list:', error);
      });
    });
  }

  addToWishList(book: any) {
    this.appwriteService.getCurrentUser().then(user => {
      const bookData = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
        description: book.volumeInfo.description || 'No Description',
        imageUrl: book.volumeInfo.imageLinks?.thumbnail || '', 
        averageRating: book.volumeInfo.averageRating?.toString() || 'No rating',
        pageCount: book.volumeInfo.pageCount?.toString() || 'N/A',
        publishedDate: book.volumeInfo.publishedDate || 'Unknown Date',
        previewLink: book.volumeInfo.previewLink || '',
        listType: 'wish',
        userId: user.$id,
      };
      this.appwriteService.createBook(bookData).then(() => {
        console.log('Book added to wish list');
        this.readListService.addToWishList(bookData);  // Update the service with the new book
      }).catch(error => {
        console.error('Error adding book to wish list:', error);
      });
    });
  }
}
