import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getAccounts(accNumber: string): Observable<any>{
    var accEndPoint = "http://localhost:8080/cbf/v1/memberAccounts/";
    accEndPoint = accEndPoint.concat(accNumber);
    return this.http.post(accEndPoint, {});
  }
}
