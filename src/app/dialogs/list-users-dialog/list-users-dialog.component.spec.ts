import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersDialogComponent } from './list-users-dialog.component';

describe('ListUsersDialogComponent', () => {
  let component: ListUsersDialogComponent;
  let fixture: ComponentFixture<ListUsersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsersDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
