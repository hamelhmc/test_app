import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoModule } from '../../photo.module';
import { PhotoViewComponent } from './photo-view.component';

describe('PhotoViewComponent', () => {
  let component: PhotoViewComponent;
  let fixture: ComponentFixture<PhotoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhotoModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [PhotoViewComponent],
    });
    fixture = TestBed.createComponent(PhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
