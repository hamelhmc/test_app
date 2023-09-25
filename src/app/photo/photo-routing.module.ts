import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoViewComponent } from './components/photo-view/photo-view.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoRoutingModule {}
