import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { VehicleImageResponse } from '../interfaces/vehicle-images';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleImagesService {
  
  private apiUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllVehicleImages(): Observable<VehicleImageResponse[]>{
    return this.http.get<VehicleImageResponse[]>(`${this.apiUrl}/VehicleImage/GetAllVehicleImages`).pipe(
      catchError(error => {
        console.error('Error fetching JSON data:', error);
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }
}
