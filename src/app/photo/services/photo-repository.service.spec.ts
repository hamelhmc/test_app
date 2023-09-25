import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Photo } from '../model/photo.interface';
import { PhotoRepositoryService } from './photo-repository.service';

describe('PhotoRepositoryService', () => {
  let service: PhotoRepositoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PhotoRepositoryService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected photos when searchText is null', (done: DoneFn) => {
    const expected: { data: Photo[] } = {
      data: [
        { id: 1, photo: 'photo1.jpg', text: 'Text 1' },
        { id: 2, photo: 'photo2.jpg', text: 'Text 2' },
      ],
    };

    httpClientSpy.get.and.returnValue(of(expected));

    service.searchPhotosByNameOrID(null, 0, 20).subscribe({
      next: (data) => {
        expect(data).withContext('expected').toEqual(expected.data);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return photos by ID', (done: DoneFn) => {
    const expected: Photo[] = [
      { id: 1, photo: 'photo1.jpg', text: 'Text 1' },
      { id: 2, photo: 'photo2.jpg', text: 'Text 2' },
    ];

    httpClientSpy.get.and.returnValue(of({ data: expected }));

    service.searchPhotosByNameOrID('2', 0, 20).subscribe({
      next: (data) => {
        // Expecting only the photo with ID 1 to be returned
        expect(data).toEqual([expected[1]]);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should return photos by text', (done: DoneFn) => {
    const expected: Photo[] = [
      { id: 1, photo: 'photo1.jpg', text: 'Text 1' },
      { id: 2, photo: 'photo2.jpg', text: 'Text 2' },
    ];

    httpClientSpy.get.and.returnValue(of({ data: expected }));

    service.searchPhotosByNameOrID('Text', 0, 20).subscribe({
      next: (data) => {
        // Expecting both photos with text matching 'Text' to be returned
        expect(data).toEqual([expected[0], expected[1]]);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should handle HTTP error', (done: DoneFn) => {
    const errorMessage = 'Server Error';
    httpClientSpy.get.and.returnValue(throwError(() => new HttpErrorResponse({ status: 2, statusText: errorMessage })));

    service.searchPhotosByNameOrID('test', 0, 20).subscribe({
      next: () => {
        done.fail;
      },
      error: (error) => {
        expect(error).toContain(errorMessage);
        done();
      },
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
