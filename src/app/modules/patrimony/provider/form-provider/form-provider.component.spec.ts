import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProviderComponent } from './form-provider.component';

describe('FormProviderComponent', () => {
  let component: FormProviderComponent;
  let fixture: ComponentFixture<FormProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
