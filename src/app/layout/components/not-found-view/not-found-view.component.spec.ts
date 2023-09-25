import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundViewComponent } from './not-found-view.component';

describe('NotFoundViewComponent', () => {
  let component: NotFoundViewComponent;
  let fixture: ComponentFixture<NotFoundViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundViewComponent],
    });
    fixture = TestBed.createComponent(NotFoundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
