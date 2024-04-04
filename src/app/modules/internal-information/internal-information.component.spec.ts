import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalInformationComponent } from './internal-information.component';

describe('InternalInformationComponent', () => {
  let component: InternalInformationComponent;
  let fixture: ComponentFixture<InternalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
