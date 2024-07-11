import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { CustomerEditComponent } from './components/customers/customer-edit/customer-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'customers',
    component: CustomersListComponent,
  },
  {
    path: 'customer/:id',
    component: CustomerEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
