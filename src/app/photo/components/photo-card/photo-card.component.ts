import { Component, Input } from '@angular/core';
import { Photo } from '../../model/photo.interface';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css'],
})
export class PhotoCardComponent {
  @Input() photo: Photo | null = null;

  handleImageError(event: any): void {
    event.target.src =
      'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';
  }
}
