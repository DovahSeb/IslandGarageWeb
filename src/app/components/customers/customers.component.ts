import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerResponse } from '../../interfaces/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

  displayedColumns: string[] = ['customerNumber', 'name', 'address', 'phoneNumber'];
  customerData = new Array<CustomerResponse>();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void { 
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: data => {
        this.customerData = data;
      },
      error: error => {
        console.error('Error fetching JSON data:', error)
      }
    });
  }

}
