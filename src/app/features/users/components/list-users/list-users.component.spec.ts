
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { User } from '../../../../models/users.model';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsersComponent, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;

    component.users = mockUsers;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });
});
