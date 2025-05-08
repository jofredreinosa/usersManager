import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ListUsersComponent} from "./components/list-users/list-users.component";
import {MatDivider} from "@angular/material/divider";

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
 private userService = inject(UserService);

 readonly users = this.userService.users;

  ngOnInit(): void {
    this.loadUsersData();
  }

  onEdit(id: string): void {
    console.log('Editar usuario', id);
  }

  onDelete(id: string): void {
    console.log('Eliminar usuario', id);
  }

  onAdd(): void {
    console.log('Agregar usuario');
  }

  private loadUsersData() {
    void this.userService.loadUsers();
  }
}
