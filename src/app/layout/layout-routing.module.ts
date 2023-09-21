import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NotFoundViewComponent } from './components/not-found-view/not-found-view.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [],
  },
  { path: '**', component: NotFoundViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
