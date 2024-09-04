import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTextSectionComponent } from './main-text-section.component';

describe('MainTextSectionComponent', () => {
  let component: MainTextSectionComponent;
  let fixture: ComponentFixture<MainTextSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTextSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTextSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
