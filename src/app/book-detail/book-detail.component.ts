import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppwriteService } from '../appwrite.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { ReadListService } from '../read-list.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private appwriteService: AppwriteService,
    private translate: TranslateService  // Inject TranslateService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.fetchBookDetails(bookId);
    } else {
      this.handleError(this.translate.instant('INVALID_BOOK_ID'));
    }
  }

  private fetchBookDetails(bookId: string): void {
    this.appwriteService.getBookById(bookId).then(response => {
      this.book = response;
    }).catch(error => {
      console.error('Error fetching book details:', error);
      this.handleError(this.translate.instant('ERROR_FETCHING_BOOK_DETAILS'));
    });
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    console.error(message);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
