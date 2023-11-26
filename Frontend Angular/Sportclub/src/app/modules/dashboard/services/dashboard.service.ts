import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  uri = "http://localhost:8000/sportclub";


  search(query: string, isChecked: boolean, fromDate: string, toDate: string): Observable<any> {

    let response$: any;

      response$ = this.http.get(`${this.uri}/customers/search/?field=${query}&gba=${isChecked}&minDate=${fromDate}&maxDate=${toDate}`);

    return response$.pipe(

      timeout(60000)
      
    );

  }

  getID(dni: number): Observable<any> {

    return this.http.get(`${this.uri}/customers/${dni}`)

  }

  bringAll(): Observable<any> {

    let response$: any;

    response$ = this.http.get(`${this.uri}/customers/`);

    return response$.pipe(

      timeout(60000)
      
    );

  }

  deleteCustomerById(id: number): Observable<any> {

    const url = `${this.uri}/customers/${id}`;

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

    });

    return this.http.delete<any>(url, { headers }).pipe(

      catchError((error: any) => {

        console.error('Error:', error);

        return throwError(error);
      })
    );
  }

  createCustomer(data: any): Observable<any> {
    const url = `${this.uri}/customers/`;

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

    });

    return this.http.post<any>(url, data, { headers }).pipe(

      catchError((error: any) => {

        console.error('Error:', error);

        return throwError(error);

      })
    );
  }

  updateCustomer(id: number, newData: any): Observable<any> {

    const url = `${this.uri}/customers/${id}/`;

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

    });

    return this.http.put<any>(url, newData, { headers }).pipe(

      catchError((error: any) => {

        console.error('Error:', error);

        return throwError(error);

      })
    );
  }

}
