import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SnackBarComponent} from "../components/snack-bar/snack-bar.component";

export interface SnackBarData {
  message: string;
  icon: string;
  type: 'error' | 'info' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  private snackBar = inject(MatSnackBar);

  open(message: string, type = 'success', durationInSeconds = 5): void {
    const icon = { success: 'check', error: 'warning', info: 'info' }[type];
    const panelClass = { success: 'snack-success', error: 'snack-error', info: 'snack-info' }[type];
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: durationInSeconds * 1000,
      data: { message, icon, type },
      panelClass,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
