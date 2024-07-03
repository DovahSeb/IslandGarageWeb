import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateCustomerRequest, CustomerResponse } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<CustomerResponse[]>{
    return this.http.get<CustomerResponse[]>(`${this.apiUrl}/Customer/GetAllCustomers`).pipe(
      catchError(error => {
        console.error('Error fetching JSON data:', error);
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }

  addCustomer(newCustomer: CreateCustomerRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Customer/AddCustomer/', JSON.stringify(newCustomer), this.httpOptions).pipe(
      catchError(error => {
        console.error('Error adding post:', error);
        return throwError(()=> new Error('Failed to add post.'));
      })
    );
  }

}
