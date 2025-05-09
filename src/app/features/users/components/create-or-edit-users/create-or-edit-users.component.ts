import { Component, computed, inject, signal, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from "../../../../services/user.service";
import { User } from "../../../../models/users.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {FormService} from "../../../../services/form.service";
import {MatIcon} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {environment} from "../../../../../environments/environment";
import {CustomValidators} from "../../../../Validators/custom.validator";
import {SnackService} from "../../../../services/snack.service";

@Component({
  selector: 'app-create-or-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIcon,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-or-edit-users.component.html',
  styleUrl: './create-or-edit-users.component.scss',
})
export class CreateOrEditUsersComponent implements OnInit {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private originalData = '';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snack = inject(SnackService);
  private userService = inject(UserService);

  readonly isEditMode = computed(() => !!this.userId());
  readonly pageTitle = computed(() => this.isEditMode() ? 'Editar Usuario' : 'Crear Usuario');
  readonly user = signal<User | null>(null);
  readonly userId = signal<string>(this.route.snapshot.paramMap.get('id') ?? '');

  form: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', [Validators.required, CustomValidators.minAgeValidator(18)]],
    cellPhone: ['', Validators.required],
  });

  get formCtrl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.checkComponentMode();
  }

  onSubmit(): void {
    if (!this.formService.validateForm(this.form)) {
      const errorMessage = 'Complete los datos necesarios para continuar'
      this.sendFeedback(errorMessage);
      return;
    }

    this.isEditMode() ? this.performUserEdition() : this.performUserCreation()
  }

  goBack() {
    void this.router.navigate(['/users']);
  }

  private checkComponentMode(): void {
    if (this.isEditMode()) {
      this.loadUserForEdition();
    }
  }

  private loadUserForEdition(): void {
    const found = this.userService.users().find(u => u.id === this.userId()) ?? null;
    if (!found) {
      const errorMessage = `Usuario con id ${this.userId()} no fue encontrado.`
      this.sendFeedback(errorMessage);
      this.goBack();
      return;
    }

    this.setUserValues(found);
  }

  private performUserEdition(): void {
    if (!this.checkForChanges()) {
      return;
    }
    this.userService.updateUser(this.userId(), this.form.value);
    const successMessage = 'Usuario actualizado con éxito';
    this.sendFeedback(successMessage);
    this.goBack();
  }

  private checkForChanges(): boolean {
    const currentUser = this.user();
    const updatedUser: User = {
      id: currentUser?.id ?? '',
      cellPhone: this.form.value.cellPhone,
      dob: new Date(this.form.value.dob).toISOString(),
      email: this.form.value.email,
      fullName: this.form.value.fullName,
      thumbnail: currentUser?.thumbnail ?? '',
      userName: this.form.value.userName
    }
    const modifiedData = JSON.stringify(updatedUser);
    if (this.originalData === modifiedData) {
      const feedbackMessage = 'Nada ha cambiado, no hay nada que actualizar.';
      this.sendFeedback(feedbackMessage, 'info');
      return false;
    }
    return true;
  }

  private performUserCreation(): void {
    const thumbnailId = Math.floor(Math.random() * 100);
    const newUser: User = {
      ...this.form.value,
      id: crypto.randomUUID(),
      thumbnail: `${environment.apiUrl}portraits/thumb/men/${thumbnailId}.jpg`,
    };
    this.userService.addUser(newUser);
    const successMessage = 'Usuario creado con éxito';
    this.sendFeedback(successMessage);
    this.goBack();
  }

  private sendFeedback(message: string, type = 'success'): void {
    this.snack.open(message, type);
  }

  private setUserValues(found: User) {
    this.user.set(found);
    this.form.patchValue({
      fullName: found.fullName,
      userName: found.userName,
      email: found.email,
      dob: new Date(found.dob),
      cellPhone: found.cellPhone
    });
    this.originalData = JSON.stringify(found);
  }
}
