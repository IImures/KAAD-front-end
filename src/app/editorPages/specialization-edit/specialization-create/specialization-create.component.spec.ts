import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationCreateComponent } from './specialization-create.component';

describe('SpecializationCreateComponent', () => {
  let component: SpecializationCreateComponent;
  let fixture: ComponentFixture<SpecializationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
