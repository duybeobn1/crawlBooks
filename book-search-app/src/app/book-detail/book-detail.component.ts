import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`).subscribe(data => {
      this.book = data;
    });
  }
}
