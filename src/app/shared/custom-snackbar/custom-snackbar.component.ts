import { Component, OnInit, Inject, Renderer2 } from '@angular/core';

import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private _snackRef: MatSnackBarRef<CustomSnackbarComponent>,
    private ren: Renderer2
  ) {}

  ngOnInit() {}

  dismiss() {
    this._snackRef.dismiss();
  }
}
