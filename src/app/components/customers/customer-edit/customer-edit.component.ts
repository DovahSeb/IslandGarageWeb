import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../../services/customer.service';
import { UpdateCustomerRequest } from '../../../interfaces/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent {

  customerForm: UpdateCustomerRequest = {
    id: -1,
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: ''
  };

  customerId: number = -1;
  customerNumber: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
              private messageService: MessageService, private customerService: CustomerService) {
    this.customerId = Number(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void { 
    this.getCustomerById(this.customerId)
  }

  getCustomerById(id: number) : void {
    this.customerService.getCustomerById(id).subscribe(result => {
      this.customerForm = result;
      this.customerNumber = result.customerNumber;
    })
  }

  updateCustomer(form: any) : void {
    if(form.valid){
      this.customerService.updateCustomer(this.customerForm).subscribe(result => {
        this.messageService.clear();
        this.messageService.add({ key: 'successKey', severity: 'success', summary: 'Success', detail: 'Customer: ' + result.firstName + ' ' + result.lastName + ' has been updated successfully' });
      })
    }
  }

  cancel() : void {
    this.router.navigate(['/customers']);
  }

}
