import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialogComponent, DialogData } from './confirmation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { By } from '@angular/platform-browser';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  const mockDialogData: DialogData = {
    message: 'Mensaje de confirmación',
    optionalMsg: 'Mensaje opcional',
    textBtnCancel: 'Cancelar',
    textBtnConfirm: 'Confirmar'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmationDialogComponent,
        MatDialogModule,
        MatButtonModule,
        A11yModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should correctly receive the data from the dialog', () => {
    expect(component.data).toEqual(mockDialogData);
  });

  it('Should display the main message in the DOM', () => {
    const messageElement = fixture.debugElement.query(By.css('.message'));
    expect(messageElement.nativeElement.textContent).toContain(mockDialogData.message);
  });

  it('Should display the optional message in the DOM', () => {
    const optionalElement = fixture.debugElement.query(By.css('.optional-message'));
    expect(optionalElement.nativeElement.textContent).toContain(mockDialogData.optionalMsg);
  });

  it('Should display the cancel button text', () => {
    const cancelButton = fixture.debugElement.query(By.css('.cancel-button'));
    expect(cancelButton.nativeElement.textContent).toContain(mockDialogData.textBtnCancel);
  });

  it('Should display the confirm button text', () => {
    const confirmButton = fixture.debugElement.query(By.css('.confirm-button'));
    expect(confirmButton.nativeElement.textContent).toContain(mockDialogData.textBtnConfirm);
  });
});
