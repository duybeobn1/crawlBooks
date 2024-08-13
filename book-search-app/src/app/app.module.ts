import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { ReadListComponent } from './read-list/read-list.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ReadListService } from './read-list.service';
import { WishListComponent } from './wish-list/wish-list.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-detail/book-detail.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent,
    ReadListComponent,
    NavigationComponent,
    WishListComponent,
    BookDetailsComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    
  ],
  providers: [ReadListService],
  bootstrap: [AppComponent]
})

export class AppModule {
}