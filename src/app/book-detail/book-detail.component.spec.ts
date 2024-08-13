import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppwriteService } from '../appwrite.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  errorMessage: string | null = null;  // To store any error message

  constructor(private route: ActivatedRoute, private appwriteService: AppwriteService) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
        this.appwriteService.getBookById(bookId).then(response => {
            this.book = response;
        }).catch(error => {
            console.error('Error fetching book details:', error);
            this.errorMessage = 'Could not find the book details. It might have been removed.';
        });
    } else {
        this.errorMessage = 'Invalid book ID.';
        console.error('Book ID is null');
    }
  }
}
