import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription, delay } from 'rxjs';

import { ListRange } from '@angular/cdk/collections';
import { PhotoRepositoryService } from '../services/photo-repository.service';
import { Photo } from './photo.interface';

const DEFAULT_PHOTOS_PER_PAGE = 100;
const MAX_PHOTOS_COUNT = 1000;
const DEFAULT_DELAY = 200;

export class PhotoDataSource extends DataSource<Photo | undefined> {
  private readonly _length = MAX_PHOTOS_COUNT;
  private readonly _pageSize = DEFAULT_PHOTOS_PER_PAGE;
  private _cachedData = Array.from<Photo>({ length: this._length });
  private readonly _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject<(Photo | undefined)[]>(this._cachedData);
  private readonly _subscription = new Subscription();

  private searchString: string | null = null;
  public isLoading = false;

  constructor(private readonly photoService: PhotoRepositoryService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Photo | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range: ListRange) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      })
    );

    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  public searchByString(searchString: string): void {
    this.searchString = searchString;
    this._cachedData = Array.from<Photo>({ length: this._length });
    this.loadData(0, this.searchString);
  }

  public cargarPagina(pagina: number): void {
    this._fetchPage(pagina);
  }

  public loadData(page: number, searchString: string | null): void {
    this.isLoading = true;
    this.photoService
      .searchPhotosByNameOrID(searchString, page, this._pageSize)
      .pipe(delay(DEFAULT_DELAY))
      .subscribe((data: Photo[]) => {
        this.isLoading = false;
        this._cachedData.splice(page * this._pageSize, this._pageSize, ...data);
        this._dataStream.next(this._cachedData);
      });
  }

  private _fetchPage(page: number): void {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);
    this.loadData(page, this.searchString);
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }
}
