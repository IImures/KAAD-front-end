import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeamMemberComponent } from './list-team-member.component';

describe('ListTeamMemberComponent', () => {
  let component: ListTeamMemberComponent;
  let fixture: ComponentFixture<ListTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTeamMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
