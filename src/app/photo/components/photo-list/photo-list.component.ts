import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhotoDataSource } from '../../model/photo-data-source';
import { PhotoRepositoryService } from '../../services/photo-repository.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnChanges {
  photoDataSource: PhotoDataSource;

  @Input() search = '';

  constructor(private readonly PhotoRepository: PhotoRepositoryService) {
    this.photoDataSource = new PhotoDataSource(this.PhotoRepository);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search']) {
      this.photoDataSource.searchByString(this.search);
    }
  }
}
