import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  constructor(private customerService: CustomerService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private dialog: MatDialog) { }

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
    this.customerService.getCustomerById(id).subscribe(() => {});
  }

  addNewCustomer() : void {
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

  deleteCustomer(event: Event, id: number) : void {
    console.log(id);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this customer?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.customerService.deleteCustomer(id).subscribe(result => {
          this.customerData = this.customerData.filter(x => x.id !== result.id);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer deleted' });
        })
      },
      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
