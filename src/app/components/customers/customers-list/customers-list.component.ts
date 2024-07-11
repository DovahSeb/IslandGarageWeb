import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { CustomerService } from '../../../services/customer.service';
import { CustomerResponse } from '../../../interfaces/customer';
import { CustomerAddComponent } from '../customer-add/customer-add.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent {

  customerData = new Array<CustomerResponse>();
  loading: boolean = true;

  constructor(private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit(): void { 
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: result => {
        this.customerData = result;
        this.loading = false;
      },
      error: error => {
        console.error('Error fetching JSON data:', error)
      }
    });
  }

  getCustomerById(id: number): void {
    this.customerService.getCustomerById(id).subscribe(result => {
      console.log(result);
    })
  }

  addNewCustomer(){
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      height: 'auto',
      width: '600px',
    })

    dialogRef.afterClosed().subscribe({
      next: (result: CustomerResponse[]) => {
        if(result.length > 0){
          this.customerData = result;
        }
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
