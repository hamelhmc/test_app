import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import { BaseLayoutComponent } from './base-layout.component';

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BaseLayoutComponent, HeaderComponent],
    });
    fixture = TestBed.createComponent(BaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
