import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { VehicleResponse } from '../interfaces/customer-vehicles';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehiclesService {

  private apiUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getCustomerVehicleById(customerId: number): Observable<VehicleResponse[]>{
    return this.http.get<VehicleResponse[]>(this.apiUrl + '/Vehicle/GetVehicleByCustomerId/' + customerId).pipe(
      catchError(error => {
        console.error('Error fetching JSON data:', error);
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    )
  }
}
