import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UserService } from '../../services/user.service';
import { signal } from '@angular/core';
import {User} from "../../models/users.model";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceMock: any;
  let usersSignal = signal<User[]>([]);

  const mockUsers: User[] = [
    {
      id: '1234567890',
      cellPhone: '07700 900123',
      dob: '1985-05-15T00:00:00Z',
      email: 'usuario1@ejemplo.com',
      fullName: 'Ana García',
      thumbnail: 'https://ejemplo.com/imagen1.jpg',
      userName: 'anagarcia'
    }
  ];

  beforeEach(() => {
    userServiceMock = {
      users: usersSignal,
      loadUsers: jasmine.createSpy('loadUsers').and.callFake(() => {
        usersSignal.set(mockUsers);
        return Promise.resolve();
      })
    };

    TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit(): Should call loadUsers()', () => {
    expect(userServiceMock.loadUsers).not.toHaveBeenCalled();
    fixture.detectChanges();
    expect(userServiceMock.loadUsers).toHaveBeenCalled();
  });

  it('Should have access to users through the service signal', () => {
    fixture.detectChanges();
    expect(component.users()).toEqual(mockUsers);
  });
});
