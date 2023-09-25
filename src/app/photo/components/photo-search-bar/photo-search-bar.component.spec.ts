import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoModule } from '../../photo.module';
import { PhotoSearchBarComponent } from './photo-search-bar.component';

describe('PhotoSearchBarComponent', () => {
  let component: PhotoSearchBarComponent;
  let fixture: ComponentFixture<PhotoSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoSearchBarComponent],
      imports: [ReactiveFormsModule, PhotoModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit initial search text change', () => {
    const spy = spyOn(component.initialSearchTextChange, 'emit');
    const newValue = 'New Value';
    component.searchForm.get('searchText')?.setValue(newValue);
    expect(spy).toHaveBeenCalledWith(newValue);
  });

  it('should clear search text', () => {
    const initialValue = 'Initial Value';
    component.searchForm.get('searchText')?.setValue(initialValue);
    component.clearSearch();
    const searchText = component.searchForm.get('searchText')?.value;
    expect(searchText).toEqual('');
  });

  it('should show clear button when search text is present', () => {
    component.searchForm.get('searchText')?.setValue('Some text');
    fixture.detectChanges();
    const clearButton = fixture.nativeElement.querySelector('button');
    expect(clearButton).toBeTruthy();
  });

  it('should hide clear button when search text is empty', () => {
    component.searchForm.get('searchText')?.setValue('');
    fixture.detectChanges();
    const clearButton = fixture.nativeElement.querySelector('button');
    expect(clearButton).toBeFalsy();
  });
});
