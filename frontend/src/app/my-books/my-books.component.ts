import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MoviesListModalComponent } from '../movies-list-modal/movies-list-modal.component';
import { MyBooksService } from './my-books.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent {
  displayedColumns: string[] = ['title', 'author', 'pages', 'description', 'actions'];
  dataSource: any = [];
  dialogRef: any;
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private service: MyBooksService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllBooks()
  }

  async getAllBooks(): Promise<void> {
    const result = await this.service.getBooks()
      .toPromise().catch(error => error);
    this.dataSource = result.data.data;
  }

  async onSearchClick(title: string): Promise<void> {
    const result = await this.service.searchMovies(title)
      .toPromise().catch(error => error);
      console.log(result.data)
    this.dialogRef = this.dialog.open(MoviesListModalComponent, {
      data: result.data,
      autoFocus: false
    });
  }
}
