import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, distinctUntilChanged, map, shareReplay, throwError } from 'rxjs';
import { Photo } from '../model/photo.interface';

@Injectable()
export class PhotoRepositoryService {
  private readonly apiUrl = 'https://raw.githubusercontent.com/hamelhmc/test_app/main/data/pokemos.json';

  constructor(private readonly http: HttpClient) {}

  searchPhotosByNameOrID(searchText: string | null, page: number, photosPerPage: number): Observable<Photo[]> {
    return this.fetchData().pipe(
      map((response) => {
        const photos = response.data;
        const filteredPhotos = photos.filter((photo) => {
          if (searchText === null) {
            return true;
          }

          return photo.text.toLowerCase().includes(searchText.toLowerCase()) || photo.id.toString() === searchText;
        });

        return this.paginateResults(filteredPhotos, page, photosPerPage);
      }),
      catchError(this.handleError)
    );
  }

  private fetchData(): Observable<{ data: Photo[] }> {
    return this.http.get<{ data: Photo[] }>(this.apiUrl).pipe(shareReplay(1), distinctUntilChanged());
  }

  private paginateResults(data: Photo[], page: number, photosPerPage: number): Photo[] {
    const startIndex = page * photosPerPage;
    const endIndex = startIndex + photosPerPage;

    return data.slice(startIndex, endIndex);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);

    let errorMessage = 'Ocurrió un error.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
