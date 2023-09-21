import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NotFoundViewComponent } from './components/not-found-view/not-found-view.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [BaseLayoutComponent, NotFoundViewComponent, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
