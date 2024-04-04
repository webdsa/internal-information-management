import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResidentComponent } from './form-resident.component';

describe('FormResidentComponent', () => {
  let component: FormResidentComponent;
  let fixture: ComponentFixture<FormResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormResidentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
