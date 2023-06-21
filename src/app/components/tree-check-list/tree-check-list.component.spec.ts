import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCheckListComponent } from './tree-check-list.component';

describe('TreeCheckListComponent', () => {
  let component: TreeCheckListComponent;
  let fixture: ComponentFixture<TreeCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeCheckListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
