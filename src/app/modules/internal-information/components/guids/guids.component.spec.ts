import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidsComponent } from './guids.component';

describe('GuidsComponent', () => {
  let component: GuidsComponent;
  let fixture: ComponentFixture<GuidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
