import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehiclesAddComponent } from './customer-vehicles-add.component';

describe('CustomerVehiclesAddComponent', () => {
  let component: CustomerVehiclesAddComponent;
  let fixture: ComponentFixture<CustomerVehiclesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerVehiclesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerVehiclesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
