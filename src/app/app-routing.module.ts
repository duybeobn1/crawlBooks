import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadListComponent } from './read-list/read-list.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookDetailsComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  { path: 'read-list', component: ReadListComponent },
  { path: 'wish-list', component: WishListComponent },
  { path: 'search', component: BookSearchComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
