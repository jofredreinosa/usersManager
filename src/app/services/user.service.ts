import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/users.model';

const USERS_KEY = 'cached_users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private signalUsers = signal<User[]>([]);
  readonly users = this.signalUsers.asReadonly();

  constructor() {
    effect(() => {
      const value = this.signalUsers();
      localStorage.setItem(USERS_KEY, JSON.stringify(value));
    });
  }

  async loadUsers(): Promise<void> {
    const fromStorage = localStorage.getItem(USERS_KEY);
    if (fromStorage) {
      try {
        const parsed = JSON.parse(fromStorage) as User[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.signalUsers.set(parsed);
          return;
        }
      } catch (e) {
        console.warn('Error al parsear localStorage, se ignora:', e);
      }
    }


    const apiUsers = await this.fetchUsersFromApi();
    this.signalUsers.set(apiUsers);
  }

  private fetchUsersFromApi(): Promise<User[]> {
    return firstValueFrom(
      this.http.get<any>(`${this.apiUrl}?results=10&nat=gb`).pipe(
        map(data =>
          data.results.map((user: any) => ({
            id: user.login.uuid,
            cellPhone: user.cell,
            dob: user.dob.date,
            email: user.email,
            fullName: `${user.name.first} ${user.name.last}`,
            thumbnail: user.picture.thumbnail,
            userName: user.login.username
          }))
        )
      )
    );
  }
}
