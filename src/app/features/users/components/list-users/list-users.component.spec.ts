import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { User } from '../../../../models/users.model';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  const mockUsers: User[] = [
    {
      thumbnail: 'assets/users/user1.jpg',
      fullName: 'Ana García',
      userName: 'anagarcia',
      email: 'ana.garcia@ejemplo.com',
      cellPhone: '123-456-7890',
      dob: '1990-01-15'
    },
    {
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
      imports: [ListUsersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;

    component.users = mockUsers;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit edit event', () => {
    spyOn(component.edit, 'emit');
    component.edit.emit('1');
    expect(component.edit.emit).toHaveBeenCalledWith('1');
  });

  it('Should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.delete.emit('1');
    expect(component.delete.emit).toHaveBeenCalledWith('1');
  });
});
