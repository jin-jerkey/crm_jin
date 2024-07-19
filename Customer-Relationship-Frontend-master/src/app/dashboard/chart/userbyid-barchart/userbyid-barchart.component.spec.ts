import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbyidBarchartComponent } from './userbyid-barchart.component';

describe('UserbyidBarchartComponent', () => {
  let component: UserbyidBarchartComponent;
  let fixture: ComponentFixture<UserbyidBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbyidBarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserbyidBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
