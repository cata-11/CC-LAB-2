import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movies-list-modal',
  templateUrl: './movies-list-modal.component.html',
  styleUrls: ['./movies-list-modal.component.scss']
})
export class MoviesListModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[] = []) { }

  ngOnInit() {

  }
}
