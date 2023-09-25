import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCardComponent } from './photo-card.component';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoCardComponent],
    });
    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display photo and text when provided', () => {
    const photo = {
      id: 1,
      photo: 'photo-url.jpg',
      text: 'Sample Text',
    };
    component.photo = photo;
    fixture.detectChanges();

    const imgElement = debugElement.nativeElement.querySelector('img');
    const textElement = debugElement.nativeElement.querySelector('.photo-card__text');

    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('src')).toBe(photo.photo);
    expect(imgElement.getAttribute('alt')).toBe(photo.text);

    expect(textElement).toBeTruthy();
    expect(textElement.textContent).toBe(photo.text);
  });

  it('should handle image error', () => {
    const invalidUrl = 'invalid-url';
    component.photo = { id: 1, photo: invalidUrl, text: 'Sample Text' };

    fixture.detectChanges();

    const imgElement = fixture.nativeElement.querySelector('.photo-card__image-img');

    const errorEvent = new Event('error');
    imgElement.dispatchEvent(errorEvent);

    fixture.detectChanges();

    expect(imgElement.src).toBe(
      'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
    );
  });
});
