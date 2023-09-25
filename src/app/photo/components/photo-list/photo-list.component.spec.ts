import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotoModule } from '../../photo.module';
import { PhotoListComponent } from './photo-list.component';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhotoModule, HttpClientTestingModule],
      declarations: [PhotoListComponent],
    });
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
