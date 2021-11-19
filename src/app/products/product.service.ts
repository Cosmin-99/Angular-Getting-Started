import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './product';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {

  constructor(private http: HttpClient) {}

  private productUrl = "api/products/products.json";

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log("AlL", JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }

    console.log(errorMessage)
    return throwError(errorMessage);
  }
}
