import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import {User} from "../models/users.model";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser = {
    cell: '07700 900100',
    dob: { date: '1990-01-01T00:00:00Z' },
    email: 'usuario@ejemplo.com',
    name: { first: 'Juan', last: 'Pérez' },
    picture: { thumbnail: 'https://ejemplo.com/imagen.jpg' },
    login: { username: 'juanperez' }
  };

  const mappedUser: User = {
    cellPhone: '07700 900100',
    dob: '1990-01-01T00:00:00Z',
    email: 'usuario@ejemplo.com',
    fullName: 'Juan Pérez',
    thumbnail: 'https://ejemplo.com/imagen.jpg',
    userName: 'juanperez'
  };

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should create an instance of the service', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly transform API user data', async () => {
    const mockApiResponse = { results: [mockUser] };
    const expectedUsers: User[] = [mappedUser];

    const usersPromise = service.getUsers();

    const req = httpMock.expectOne(`${apiUrl}?results=10&nat=gb`);
    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);

    const users = await usersPromise;
    expect(users).toEqual(expectedUsers);
  });

});
