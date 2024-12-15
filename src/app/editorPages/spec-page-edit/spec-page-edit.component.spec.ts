import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecPageEditComponent } from './spec-page-edit.component';

describe('SpecPageEditComponent', () => {
  let component: SpecPageEditComponent;
  let fixture: ComponentFixture<SpecPageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecPageEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
