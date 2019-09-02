import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import{ MatButtonModule } from '@angular/material/button';
import{ MatToolbarModule } from '@angular/material/toolbar';
import{ MatGridListModule } from '@angular/material/grid-list';
import{ MatSidenavModule } from '@angular/material/sidenav';
import{ MatCardModule } from '@angular/material/card';
import{ MatTreeModule } from '@angular/material/tree';
import{ MatCheckboxModule } from '@angular/material/checkbox';
import{ MatSliderModule } from '@angular/material/slider';
import{ MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
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
    MatSnackBarModule
  ],
  exports: [HeaderComponent, FooterComponent, MatButtonModule, MatToolbarModule, MatGridListModule, MatSidenavModule, MatCardModule, MatTreeModule, MatCheckboxModule, MatSliderModule, MatSnackBarModule]
})
export class SharedModule { }
