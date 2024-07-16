import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CustomerVehiclesService } from '../../../services/customer-vehicles.service';
import { CustomerVehiclesAddComponent } from '../customer-vehicles-add/customer-vehicles-add.component';
import { VehicleResponse } from '../../../interfaces/customer-vehicles';

@Component({
  selector: 'app-customer-vehicles-list',
  templateUrl: './customer-vehicles-list.component.html',
  styleUrl: './customer-vehicles-list.component.scss'
})
export class CustomerVehiclesListComponent {

  @Input() customerId: number = -1;

  customerVehiclesData = new Array<VehicleResponse>();
  dialog: DynamicDialogRef | undefined;
  responsiveOptions: any[] | undefined;

  constructor(private sanitizer: DomSanitizer, public dialogService: DialogService, 
              private messageService: MessageService, private customerVehiclesService: CustomerVehiclesService) {}

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
      this.customerVehiclesData = sanitizedResult;
    });
  }

  addNewCustomerVehicle() : void {
    this.dialog = this.dialogService.open(CustomerVehiclesAddComponent, {
      header: 'Add New Vehicle',
      width: '50vw',
      modal: true,
      data: {
        customerId: this.customerId
      },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.dialog.onClose.subscribe((data: any) => {
      if(data !== "Close"){
        const vehicleData = data as VehicleResponse[];
        const sanitizedData = vehicleData.map((vehicle: VehicleResponse) => {
          vehicle.vehicleImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${vehicle.vehicleImage}`) as string;
          return vehicle;
        });

        this.customerVehiclesData = sanitizedData;
        this.messageService.clear();
        this.messageService.add({ key: 'successKey', severity: 'success', summary: 'Success', detail: 'Vehicle added successfully' });
      }
    })
  }
}
