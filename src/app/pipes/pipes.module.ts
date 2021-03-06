import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchPipe],
  exports: [SearchPipe]
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: []
    };
  }
}
