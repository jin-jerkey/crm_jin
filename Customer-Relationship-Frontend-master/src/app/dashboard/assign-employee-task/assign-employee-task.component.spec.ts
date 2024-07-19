import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeeTaskComponent } from './assign-employee-task.component';

describe('AssignEmployeeTaskComponent', () => {
  let component: AssignEmployeeTaskComponent;
  let fixture: ComponentFixture<AssignEmployeeTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEmployeeTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignEmployeeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
