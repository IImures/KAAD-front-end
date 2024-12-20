import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditComponent } from './page-edit.component';

describe('PageEditComponent', () => {
  let component: PageEditComponent;
  let fixture: ComponentFixture<PageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
