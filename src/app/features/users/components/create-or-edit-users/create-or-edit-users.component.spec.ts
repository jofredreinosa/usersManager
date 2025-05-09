import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import {User} from "../../../../models/users.model";
import {CreateOrEditUsersComponent} from "./create-or-edit-users.component";

describe('CreateOrEditUsersComponent', () => {
  let component: CreateOrEditUsersComponent;
  let fixture: ComponentFixture<CreateOrEditUsersComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    // Crear mock para UserService
    const mockUsers: User[] = [
      {
        id: '1234567890',
        thumbnail: 'assets/users/user1.jpg',
        fullName: 'Ana García',
        userName: 'anagarcia',
        email: 'ana.garcia@ejemplo.com',
        cellPhone: '123-456-7890',
        dob: '1990-01-15'
      },
      {
        id: '0987654321',
        thumbnail: 'assets/users/user2.jpg',
        fullName: 'Carlos López',
        userName: 'carloslopez',
        email: 'carlos.lopez@ejemplo.com',
        cellPhone: '987-654-3210',
        dob: '1985-08-22'
      }
    ];
    mockUserService = jasmine.createSpyObj('UserService', ['users']);
    mockUserService.users.and.returnValue(mockUsers);

    await TestBed.configureTestingModule({
      imports: [CreateOrEditUsersComponent],
      providers: [
        // Mock para ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: null })
            }
          }
        },
        // Mock para Router
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        },
        // Utilizar el mock de UserService
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para modo crear (sin ID)
  it('should be in create mode when no id is provided', () => {
    expect(component.isEditMode()).toBeFalse();
    expect(component.pageTitle()).toBe('Crear Usuario');
  });

  // Puedes agregar más pruebas según necesites
});
