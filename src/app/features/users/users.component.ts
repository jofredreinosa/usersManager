import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ListUsersComponent} from "./components/list-users/list-users.component";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent, DialogData} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {User} from "../../models/users.model";
import {Router} from "@angular/router";
import {SnackService} from "../../services/snack.service";

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
  @ViewChild(ListUsersComponent) listUsersRef!: ListUsersComponent;
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snack = inject(SnackService);
  private userService = inject(UserService);

  readonly users = this.userService.users;

  ngOnInit(): void {
    this.loadUsersData();
  }

  add(): void {
    void this.router.navigate(['/users/create']);
  }

  edit(user: User): void {
    console.info(user.id);
    void this.router.navigate(['/users/edit', user.id]);
  }

  delete(userToDelete: User) {
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

  private loadUsersData() {
    void this.userService.loadUsers();
  }

  private peformUserDelete(user: User) {
    try {
      this.userService.deleteUser(user.id);
      this.sendFeedback(user);
      this.listUsersRef.resetPage();
    }
    catch (e) {
      console.error(e);
    }
  }

  private sendFeedback(user: User): void {
    this.snack.open(`Usuario ${user.fullName} eliminado con éxito`,'success',60);
  }
}
