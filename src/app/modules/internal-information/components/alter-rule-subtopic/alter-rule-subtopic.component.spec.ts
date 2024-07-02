import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterRuleSubtopicComponent } from './alter-rule-subtopic.component';

describe('AlterRuleSubtopicComponent', () => {
  let component: AlterRuleSubtopicComponent;
  let fixture: ComponentFixture<AlterRuleSubtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterRuleSubtopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterRuleSubtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
