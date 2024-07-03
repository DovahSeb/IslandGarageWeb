import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../services/customer.service';
import { CustomerResponse } from '../../../interfaces/customer';
import { CustomerAddComponent } from '../customer-add/customer-add.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent {

  displayedColumns: string[] = ['customerNumber', 'name', 'address', 'phoneNumber', 'email', 'action'];
  customerData = new Array<CustomerResponse>();

  constructor(private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit(): void { 
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: result => {
        this.customerData = result;
      },
      error: error => {
        console.error('Error fetching JSON data:', error)
      }
    });
  }

  addNewCustomer(){
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      height: 'auto',
      width: '600px',
    })

    dialogRef.afterClosed().subscribe({
      next: (result: CustomerResponse[]) => {
        this.customerData = result;
      }
    })
  }
}
