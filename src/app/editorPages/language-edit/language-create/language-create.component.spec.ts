import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCreateComponent } from './language-create.component';

describe('LanguageCreateComponent', () => {
  let component: LanguageCreateComponent;
  let fixture: ComponentFixture<LanguageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
