import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  readonly users = signal<User[]>([]);

  async loadUsers(): Promise<void> {
    const data = await this.getUsers();
    this.users.set(data);
  }

  getUsers(): Promise<User[]> {
    const users = this.http.get<User[]>(`${this.apiUrl}?results=10&nat=gb`)
      .pipe( map((data: any) => {
        const response: User[] = data.results.map((user: any) => {
          return {
            cellPhone: user.cell,
            dob: user.dob.date,
            email: user.email,
            fullName: `${user.name.first} ${user.name.last}`,
            thumbnail: user.picture.thumbnail,
            userName: user.login.username,
          }
        });
        return response;
      }));

    return firstValueFrom(users);
  }
}
