import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  inject, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {User} from "../../../../models/users.model";
import {MatSort} from "@angular/material/sort";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSort,
    MatTooltip
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnChanges {
  searchTerm = signal('');
  pageIndex = signal(0);
  pageSize = signal(5);

  private signalUsers = signal<User[]>([]);

  @Input({ required: true }) set users(value: User[]) {
    this.signalUsers.set(value ?? []);
  }
  readonly displayedUsers = this.signalUsers.asReadonly();

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() add = new EventEmitter<void>();

  private breakpointObserver = inject(BreakpointObserver);
  isMobile = signal(false);

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => this.isMobile.set(result.matches));
  }

  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.displayedUsers().filter(u =>
      u.fullName.toLowerCase().includes(term) ||
      u.userName.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  });

  readonly paginatedUsers = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredUsers().slice(start, start + this.pageSize());
  });

  readonly displayedColumns = computed(() =>
    this.isMobile()
      ? ['fullName', 'actions']
      : ['thumbnail', 'fullName', 'userName', 'email', 'cellPhone', 'dob', 'actions']
  );

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'].currentValue) {
      console.info(changes['users'].currentValue);
    }
  }

  onAdd(): void {
    this.add.emit();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
