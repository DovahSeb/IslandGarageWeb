import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateCustomerRequest, CustomerResponse, UpdateCustomerRequest } from '../interfaces/customer';

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

  getCustomerById(id: number): Observable<CustomerResponse>{
    return this.http.get<CustomerResponse>(this.apiUrl + '/Customer/GetCustomerById/' + id).pipe(
      catchError(error => {
        console.error('Error fetching JSON data:', error);
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    )
  }

  addCustomer(newCustomer: CreateCustomerRequest): Observable<CustomerResponse[]> {
    return this.http.post<CustomerResponse[]>(this.apiUrl + '/Customer/AddCustomer/', JSON.stringify(newCustomer), this.httpOptions).pipe(
      catchError(error => {
        console.error('Error adding post:', error);
        return throwError(()=> new Error('Failed to add customer'));
      })
    );
  }

  updateCustomer(updateCustomer: UpdateCustomerRequest): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(this.apiUrl + '/Customer/UpdateCustomer/', JSON.stringify(updateCustomer), this.httpOptions).pipe(
      catchError(error => {
        console.error('Error adding post:', error);
        return throwError(()=> new Error('Failed to update customer.'));
      })
    )
  }

}
