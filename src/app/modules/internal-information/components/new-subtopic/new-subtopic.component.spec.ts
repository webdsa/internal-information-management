import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubtopicComponent } from './new-subtopic.component';

describe('NewSubtopicComponent', () => {
  let component: NewSubtopicComponent;
  let fixture: ComponentFixture<NewSubtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSubtopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSubtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
