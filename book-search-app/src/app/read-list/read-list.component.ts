import { Component, OnInit, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.component.html',
  styleUrls: ['./read-list.component.css']
})
export class ReadListComponent implements OnInit {
  readList: any[] = [];
  @Output() readListUpdated = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadReadList();
  }

  loadReadList() {
    if (isPlatformBrowser(this.platformId)) {
      this.readList = JSON.parse(localStorage.getItem('readList') || '[]');
    }
  }

  removeFromReadList(book: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.readList = this.readList.filter(item => item.id !== book.id);
      localStorage.setItem('readList', JSON.stringify(this.readList));
      this.readListUpdated.emit();
    }
  }
}
