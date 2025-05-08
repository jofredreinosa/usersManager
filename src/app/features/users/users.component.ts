import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ListUsersComponent} from "./components/list-users/list-users.component";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent, DialogData} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {User} from "../../models/users.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-users',
  imports: [
    ListUsersComponent,
    MatDivider
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  private userService = inject(UserService);

  readonly users = this.userService.users;

  ngOnInit(): void {
    this.loadUsersData();
  }

  onEdit(id: string): void {
    console.log('Editar usuario', id);
  }

  onDelete(userToDelete: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: <DialogData>{
        message: '¿Estás seguro?',
        optionalMsg: `Vas a eliminar al usuario ${userToDelete.fullName}.`,
        textBtnCancel: 'No, Cancelar',
        textBtnConfirm: 'Sí, Eliminar',
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.peformUserDelete(userToDelete);
      }
    });
  }


  onAdd(): void {
    console.log('Agregar usuario');
  }

  private loadUsersData() {
    void this.userService.loadUsers();
  }

  private peformUserDelete(user: User) {
    try {

      this.userService.deleteUser(user.id);
      this.sendFeedback(user);
    }
    catch (e) {
      console.error(e);
    }
  }

  private sendFeedback(user: User): void {
    this.snack.open(`Usuario ${user.fullName} eliminado con éxito`, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }
}
