import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MyBooksService } from '../my-books/my-books.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss']
})
export class SearchBooksComponent {
  form: FormGroup;
  dataSource: any [] = [];
  displayedColumns: string[] = ['title', 'author', 'pages', 'description', 'actions'];
  constructor(private service: MyBooksService) { }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    })
  }

  async onSearchBook() {
    const q = this.form.value.search;
    const result = await this.service.searchBooks(q)
      .toPromise().catch(error => error);

    const books: any[] = []
    console.log(result.data.books)

    result.data.books.forEach((b: any) => {
      let book = {
        Title: b.volumeInfo.title,
        Author: b.volumeInfo?.authors ? b.volumeInfo?.authors[0] : 'demo author',
        Description: b.volumeInfo?.description ?? 'demo desc',
        Pages: Math.floor(Math.random() * (2000 - 100 + 1) + 100)
      }
      books.push(book)
    })

    this.dataSource = books;
    console.log(this.dataSource)

  }

  async onAddClick(book: any) {
    const result = await this.service.addBook(book)
      .toPromise().catch(error => error);
    console.log(result)
  }
}
