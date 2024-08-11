import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';
import { ReadListComponent } from './read-list/read-list.component';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
  { path: '', component: BookSearchComponent },
  { path: 'read-list', component: ReadListComponent },
  { path: 'wish-list', component: WishListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
