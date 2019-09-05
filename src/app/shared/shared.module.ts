import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

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
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

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
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class SharedModule {}
