import { Component } from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerVehiclesService } from '../../../services/customer-vehicles.service';
import { VehicleImagesService } from '../../../services/vehicle-images.service';
import { CreateVehicleRequest } from '../../../interfaces/customer-vehicles';
import { VehicleImageResponse } from '../../../interfaces/vehicle-images';

@Component({
  selector: 'app-customer-vehicles-add',
  templateUrl: './customer-vehicles-add.component.html',
  styleUrl: './customer-vehicles-add.component.scss'
})
export class CustomerVehiclesAddComponent {

  vehiclesData = new Array<VehicleImageResponse>();
  loading: boolean = true;
  instance: DynamicDialogComponent | undefined;
  newCustomerVehicleForm: CreateVehicleRequest = {
    make: '',
    model: '',
    year: '',
    chassisNo: '',
    customerId: -1
  }

  constructor(public dialog: DynamicDialogRef, private dialogService: DialogService,
              private customerVehiclesService: CustomerVehiclesService, private vehicleImagesService: VehicleImagesService) {
                this.instance = this.dialogService.getInstance(this.dialog)
              }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles() : void {
    this.vehicleImagesService.getAllVehicleImages().subscribe({
      next: result => {
        this.vehiclesData = result;
        this.loading = false;
      },
      error: error => {
        console.error('Error fetching JSON data:', error)
      }
    })
  }

  addCustomerVehicle(form: any) : void {
    if(!form.valid){
      return;
    }

    if(form.valid){
      this.newCustomerVehicleForm.customerId = this.instance?.data['customerId'];
      this.customerVehiclesService.addCustomerVehicle(this.newCustomerVehicleForm).subscribe(result => {
        this.dialog.close(result);
      })
    }
  }

  cancel() {
    this.dialog.close("Close");
  }

}
