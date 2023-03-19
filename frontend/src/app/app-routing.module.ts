import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBooksComponent } from './my-books/my-books.component';
import { SearchBooksComponent } from './search-books/search-books.component';

const routes: Routes = [
  { path: 'search', component: SearchBooksComponent },
  { path: 'books', component: MyBooksComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
