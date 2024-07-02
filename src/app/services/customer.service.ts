import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CustomerResponse } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<CustomerResponse[]>{
    return this.http.get<CustomerResponse[]>(`${this.apiUrl}/Customer/GetAllCustomers`).pipe(
      catchError(error => {
        console.error('Error fetching JSON data:', error);
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }

}
