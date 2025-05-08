import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
 private userService = inject(UserService);

 readonly users = this.userService.users;

  ngOnInit(): void {
    void this.userService.loadUsers();
    //this.loadUsersData();
  }

  private loadUsersData() {
    void this.userService.loadUsers();
  }
}
