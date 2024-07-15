import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehiclesListComponent } from './customer-vehicles-list.component';

describe('CustomerVehiclesListComponent', () => {
  let component: CustomerVehiclesListComponent;
  let fixture: ComponentFixture<CustomerVehiclesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerVehiclesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerVehiclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
