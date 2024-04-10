import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMsgErrorComponent } from './FormMsgErrorComponent';

describe('FormMsgErrorComponent', () => {
  let component: FormMsgErrorComponent;
  let fixture: ComponentFixture<FormMsgErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMsgErrorComponent]
    });
    fixture = TestBed.createComponent(FormMsgErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
