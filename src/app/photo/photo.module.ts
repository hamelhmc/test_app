import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoSearchBarComponent } from './components/photo-search-bar/photo-search-bar.component';
import { PhotoViewComponent } from './components/photo-view/photo-view.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoRepositoryService } from './services/photo-repository.service';
@NgModule({
  declarations: [PhotoListComponent, PhotoCardComponent, PhotoViewComponent, PhotoSearchBarComponent],

  imports: [
    CommonModule,
    PhotoRoutingModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [
    PhotoRepositoryService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
  ],
})
export class PhotoModule {}
