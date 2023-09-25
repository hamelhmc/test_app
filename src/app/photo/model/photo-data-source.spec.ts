import { CollectionViewer, ListRange } from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { PhotoRepositoryService } from '../services/photo-repository.service';
import { PhotoDataSource } from './photo-data-source';
import { Photo } from './photo.interface';

describe('PhotoDataSource', () => {
  let dataSource: PhotoDataSource;
  let collectionViewer: CollectionViewer;
  let photoService: jasmine.SpyObj<PhotoRepositoryService>;

  beforeEach(() => {
    photoService = jasmine.createSpyObj('PhotoRepositoryService', ['searchPhotosByNameOrID']);

    collectionViewer = jasmine.createSpyObj('CollectionViewer', ['viewChange']);
    collectionViewer.viewChange = new BehaviorSubject<ListRange>({ start: 0, end: 9 }).asObservable();

    dataSource = new PhotoDataSource(photoService);
  });

  it('should be created', () => {
    expect(dataSource).toBeTruthy();
  });

  it('should connect and fetch data', () => {
    const spy = jasmine.createSpy('searchPhotosByNameOrID');
    spy.and.returnValue(of(generateTestData(10)));
    photoService.searchPhotosByNameOrID = spy;

    const viewChangeSubject = new BehaviorSubject<ListRange>({ start: 0, end: 9 });
    collectionViewer.viewChange = viewChangeSubject.asObservable();

    dataSource.connect(collectionViewer);

    expect(photoService.searchPhotosByNameOrID).toHaveBeenCalledWith(null, 0, 200);
  });

  function generateTestData(count: number): Photo[] {
    const testData: Photo[] = [];
    for (let i = 0; i < count; i++) {
      testData.push({ id: i + 1, photo: `test${i}.jpg`, text: `Test ${i}` });
    }

    return testData;
  }

  it('should disconnect', () => {
    dataSource.disconnect();
    expect(dataSource['_subscription'].closed).toBe(true);
  });

  it('should search by string', () => {
    const spy = jasmine.createSpy('searchPhotosByNameOrID');
    spy.and.returnValue(of(generateTestData(10)));
    photoService.searchPhotosByNameOrID = spy;

    const viewChangeSubject = new BehaviorSubject<ListRange>({ start: 0, end: 9 });
    collectionViewer.viewChange = viewChangeSubject.asObservable();

    const searchString = 'test';
    dataSource.searchByString(searchString);

    expect(dataSource.isLoading).toBe(true);
    expect(dataSource['searchString']).toBe(searchString);
    expect(photoService.searchPhotosByNameOrID).toHaveBeenCalledWith(searchString, 0, 200);
  });
});
