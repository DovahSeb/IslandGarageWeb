import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerVehiclesService } from '../../../services/customer-vehicles.service';
import { VehicleResponse } from '../../../interfaces/customer-vehicles';
import { map } from 'rxjs';

@Component({
  selector: 'app-customer-vehicles-list',
  templateUrl: './customer-vehicles-list.component.html',
  styleUrl: './customer-vehicles-list.component.scss'
})
export class CustomerVehiclesListComponent {

  @Input() customerId: number = -1;

  customerVehiclesData = new Array<VehicleResponse>();
  responsiveOptions: any[] | undefined;

  constructor(private sanitizer: DomSanitizer, private customerVehiclesService: CustomerVehiclesService) {}

  ngOnInit(): void{
    this.getCustomerVehiclesById(this.customerId);

    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  getCustomerVehiclesById(customerId: number){
    this.customerVehiclesService.getCustomerVehicleById(customerId).pipe(
      map((result: VehicleResponse[]) => {
        return result.map(vehicle => {
          vehicle.vehicleImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${vehicle.vehicleImage}`) as string;
          return vehicle;
        });
      })
    ).subscribe((sanitizedResult: VehicleResponse[]) => {
      console.log(sanitizedResult);
      this.customerVehiclesData = sanitizedResult;
    });
  }
}
