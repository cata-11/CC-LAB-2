import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class MyBooksService {
    constructor(private http: HttpClient) { }

    public getBooks(): Observable<[]> {
        return this.http.get<[]>(baseUrl + "/books");
    }

    public searchMovies(title: string): Observable<[]> {
        return this.http.get<[]>(baseUrl + `/search-movies?q=${title}`)
    }

    public searchBooks(title: string): Observable<[]> {
        return this.http.get<[]>(baseUrl + `/search-books?q=${title}`)
    }

    public addBook(book: any): Observable<any> {
        return this.http.post<any>(baseUrl + `/book`, book)
    }
}
