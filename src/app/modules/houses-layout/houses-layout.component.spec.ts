import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesLayoutComponent } from './houses-layout.component';

describe('HousesLayoutComponent', () => {
  let component: HousesLayoutComponent;
  let fixture: ComponentFixture<HousesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
