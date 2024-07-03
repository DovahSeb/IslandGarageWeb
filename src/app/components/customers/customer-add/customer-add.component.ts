import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CreateCustomerRequest, CustomerResponse } from '../../../interfaces/customer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent {

  customerForm: CreateCustomerRequest = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: ''
  };

  constructor(private customerService: CustomerService, public dialogRef: MatDialogRef<CustomerAddComponent>) {}

  saveCustomer(form: any) {
    if(form.valid){
      this.customerService.addCustomer(this.customerForm).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
