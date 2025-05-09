import { Component, Inject, inject } from '@angular/core';
import {
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import {SnackBarData} from "../../services/snack.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatButtonModule, NgClass, MatIconModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}

  snackBarRef = inject(MatSnackBarRef);
}
