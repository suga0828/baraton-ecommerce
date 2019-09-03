import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatCardModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    LayoutModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatCardModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    LayoutModule,
    MatListModule
  ]
})
export class SharedModule {}
