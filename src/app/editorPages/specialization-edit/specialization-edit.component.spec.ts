import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationEditComponent } from './specialization-edit.component';

describe('SpecializationEditComponent', () => {
  let component: SpecializationEditComponent;
  let fixture: ComponentFixture<SpecializationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
