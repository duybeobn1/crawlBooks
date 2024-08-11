import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(query: string, author?: string): Observable<any> {
    let searchQuery = `q=${query}`;
    if (author) {
      searchQuery += `+inauthor:${author}`;
    }
    return this.http.get(`${this.apiUrl}?${searchQuery}`);
  }
}
